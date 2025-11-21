import os
import re
import json
import csv
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import requests
from datetime import datetime
import imaplib
import email
import uuid
import base64

app = Flask(__name__)
CORS(app)

os.environ["OPENAI_API_KEY"] = (
    "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"
)

# Sessions stored in-memory
SESSIONS = {}

IMAP_PROVIDERS = {
    "gmail": {"host": "imap.gmail.com", "port": 993},
    "outlook": {"host": "outlook.office365.com", "port": 993},
    "yahoo": {"host": "imap.mail.yahoo.com", "port": 993}
}

def generate_response(prompt, agent_text, max_tokens=256, temperature=0.7):
    system_prompt = (
        f"You are an expert in analyzing customer surveys and reviews. {agent_text}"
    )
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ],
            model="gpt-4o-mini",
            max_tokens=max_tokens,
            temperature=temperature,
        )
        return json.loads(chat_completion.model_dump_json())["choices"][0]["message"][
            "content"
        ].strip()
    except Exception as e:
        raise RuntimeError(f"OpenAI API call failed: {e}")

def collect_feedback(files, uploadType="csv"):
    feedbacks = []

    if uploadType == "email":
        raw_data = files
        # Try JSON first
        try:
            parsed = json.loads(raw_data)
        except Exception:
            parsed = raw_data
        feedback = ["", parsed] if isinstance(parsed, str) else []
    else:
        # Fallback → treat as CSV
        for key, file in files.items():
            file.stream.seek(0)
            raw_data = file.stream.read().decode("utf-8")
            parsed = None
            reader = csv.reader(raw_data.splitlines())
            feedback = [", ".join(row) for row in reader]

    # Build final structured feedback
    if feedback:
        feedbacks.append({
            "header": feedback[0],
            "data": feedback[1:]
        })

    if not feedbacks:
        return None, {"error": "No feedback found in the uploaded files."}, 400

    return feedbacks, None, None


def truncate_sentence(text):
    sentences = re.findall(r"([A-Z][^.!?]*[.!?])", text)
    return " ".join(sentences)


def analyze_feedback(process_type, instruction, max_tokens=1024, temperature=0.5, source="csv"):
    id = request.form.get("id")
    email = request.form.get("email")
    files = request.files.to_dict()
    
    email_subject = request.form.get("emailSubject", "")
    email_body_text = request.form.get("emailBody", "")

    if not files and email_body_text.strip() == "":
        return jsonify({"error": "No files uploaded."}), 400
    
    if source == "email":
        payload = email_body_text
    else:
        payload = files
    
    feedbacks, error_response, error_code = collect_feedback(payload, uploadType=source)

    if error_response:
        return jsonify(error_response), error_code

    results = []
    for i, feedback in enumerate(feedbacks):
        combined_feedback = " ".join(
            [feedback["header"], ", ".join(feedback["data"][:25])]
        )
        system_prompt = instruction.format(combined_feedback)

        try:
            response = generate_response(
                combined_feedback, system_prompt, max_tokens, temperature
            )

            if source == "email":
                results.append({ email_subject: truncate_sentence(response) })
            else:
                results.append({list(files.keys())[i]: truncate_sentence(response)})

        except RuntimeError as e:
            return jsonify({"error": str(e)}), 500

    try: 
        response = requests.post('https://api.jangoro.com/ai-queries/', json={"userId": id, "email": email})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Request failed: {str(e)}"}), 500 

    return jsonify({process_type: results})


@app.route("/analyze-refinement", methods=["POST"])
def analyze_bulk_refinement():
    return analyze_feedback(
        "refinement",
        "You are an expert at creating sophisticated surveys from the given input: {}. Build me a complete survey in markdown format.",
        max_tokens=2048,
        source=request.form.get("source", "csv"),
    )


@app.route("/analyze-summary", methods=["POST"])
def analyze_bulk_summary():
    return analyze_feedback("summary", "Summarise the given text: {}.", source=request.form.get("source", "csv"))


@app.route("/analyze-sentiment", methods=["POST"])
def analyze_bulk_sentiment():
    return analyze_feedback(
        "sentiments",
        "Provide a detailed sentiment analysis of the given text and score in words - POSITIVE or NEGATIVE: {}.",
        source=request.form.get("source", "csv"),
    )


@app.route("/analyze-action-plan", methods=["POST"])
def analyze_action_plan():
    return analyze_feedback(
        "actionPlan", "Provide a strategic business action plan for the given text: {}.", source=request.form.get("source", "csv")
    )


@app.route("/analyze-engagement", methods=["POST"])
def analyze_engagement():
    if 'file' in request.files:
        uploaded_file = request.files['file']

    if not request.files:
        return jsonify({"error": "No files uploaded."}), 400

    if len(request.files) > 1:
        return jsonify({"error": "Please upload only one file for engagement analysis."}), 400

    file = next(iter(request.files.values()))
    file.stream.seek(0)
    try:
        # Use DictReader to handle headers automatically
        reader = csv.reader(file.stream.read().decode("utf-8-sig").splitlines())
        rows = list(reader)
    except Exception as e:
        return jsonify({"error": f"Failed to parse CSV: {e}"}), 400

    if len(rows) <= 1: # Header only or empty
        return jsonify({"error": "CSV file is empty."}), 400

    header = rows[0]
    data_rows = rows[1:]
    total_surveys = len(data_rows)
    completed_surveys = 0

    for row in data_rows:
        # A survey is considered completed if all its cells have non-empty values.
        if all(cell.strip() for cell in row):
            completed_surveys += 1

    completion_rate = (completed_surveys / total_surveys) * 100 if total_surveys > 0 else 0

    return jsonify({"engagement": {"completionRate": completion_rate, "totalSurveys": total_surveys, "completedSurveys": completed_surveys}})

@app.route("/analyze-query", methods=["POST"])
def analyze_ai_query():
    data = request.form  # Ensure you're using request.form for form-data

    if not data or "query" not in data:
        return jsonify({"error": "Missing 'query' parameter"}), 400

    query = data.get("query", "").strip()

    if not query:
        return jsonify({"error": "'query' cannot be empty"}), 400

    # Correct formatting
    appended = "{}. Context: {}".format(query, "{}")
    template = "You are an expert AI assistant who gives excellent responses to customer survey feedback and reviews: {}."
    system_prompt = template.format(appended)

    return analyze_feedback(
        "general", system_prompt
    )  # Ensure analyze_feedback() is properly defined

@app.route("/login-email", methods=["POST"])
def login_email():
    data = request.json
    email_addr = data["email"]
    password = data["password"]
    provider = data["provider"]

    if provider != "imap":
        host = IMAP_PROVIDERS[provider]["host"]
        port = IMAP_PROVIDERS[provider]["port"]
    else:
        return jsonify({"error": "Custom IMAP not configured"}), 400

    # Try logging in to IMAP
    try:
        m = imaplib.IMAP4_SSL(host, port)
        m.login(email_addr, password)
        m.logout()
    except Exception as e:
        return jsonify({"error": f"Login failed: {str(e)}"}), 401

    # Create user session
    session_id = str(uuid.uuid4())
    SESSIONS[session_id] = {
        "email": email_addr,
        "password": password,
        "host": host,
        "port": port
    }

    return jsonify({"session_id": session_id})

@app.route("/email-feedback", methods=["GET"])
def get_feedback():
    session_id = request.headers.get("X-Session")
    if not session_id or session_id not in SESSIONS:
        return jsonify({"error": "Invalid session"}), 403

    session = SESSIONS[session_id]

    # Connect to mailbox
    m = imaplib.IMAP4_SSL(session["host"], session["port"])
    m.login(session["email"], session["password"])
    m.select("INBOX")

    # Find emails with "feedback" in the subject
    # _, search_data = m.search(None, '(HEADER Subject "feedback")')
    _, search_data = m.search(None, '(HEADER Subject "Freedom")')
    email_ids = search_data[0].split()

    results = []

    for eid in email_ids:
        _, msg_data = m.fetch(eid, "(RFC822)")
        raw = msg_data[0][1]
        msg = email.message_from_bytes(raw)

        # Extract body
        if msg.is_multipart():
            part = msg.get_payload(0)
            body = part.get_payload(decode=True).decode(errors="ignore")
        else:
            body = msg.get_payload(decode=True).decode(errors="ignore")

        results.append({
            "id": eid.decode(),
            "subject": msg.get("Subject"),
            "from": msg.get("From"),
            "body": body
        })

    m.logout()
    return jsonify(results)

import os
import csv
from flask import request, jsonify

@app.route("/survey-submit", methods=["POST"])
def survey_submit():
    data = request.json
    print("Received survey submission:", data)

    # Extract fields
    customer_name = data.get("customerName", "unknown_name")
    customer_email = data.get("customerEmail", "unknown_email")
    survey_title = data.get("surveyTitle", "untitled_survey")
    responses = data.get("responses", {})  # dict: { "question": "answer" }

    # Create save directory
    base_dir = "src/database/survey_responses"
    os.makedirs(base_dir, exist_ok=True)

    # Clean text for filenames
    def clean(text):
        return "".join(c for c in text if c.isalnum() or c in ("_", "-")).strip()

    filename = f"{clean(customer_name)}_{clean(customer_email)}_{clean(survey_title)}.csv"
    filepath = os.path.join(base_dir, filename)

    # Write or append to CSV
    file_exists = os.path.isfile(filepath)

    with open(filepath, "a", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)

        # If file doesn't exist, write header first
        if not file_exists:
            header = list(responses.keys())
            writer.writerow(header)

        # Always append a new row of answers
        row = [responses[q] for q in header]
        writer.writerow(row)

    return jsonify({
        "message": "Survey submitted successfully!",
        "file_saved": filepath
    })

@app.route("/survey-builder/responses", methods=["GET"])
def survey_list():
    base_dir = "src/database/survey_responses"
    os.makedirs(base_dir, exist_ok=True)

    # Get email filter
    email = request.args.get("email")
    if not email:
        return jsonify({"error": "Missing 'email' query parameter"}), 400

    def clean(text):
        return "".join(c for c in text if c.isalnum() or c in ("_", "-", "@", "."))

    clean_email = clean(email)

    # Filter CSV files by matching customer email
    file_list = []
    for filename in os.listdir(base_dir):
        if filename.endswith(".csv") and clean_email in filename:
            filepath = os.path.join(base_dir, filename)

            # Build metadata object
            file_info = {
                "name": filename,
                "type": "text/csv",
                "size": os.path.getsize(filepath),
                "lastModified": int(os.path.getmtime(filepath) * 1000),  # ms like browser
                "path": filepath  # optional, useful for backend
            }

            # Read file contents + encode as base64
            with open(filepath, "rb") as f:
                file_info["base64"] = base64.b64encode(f.read()).decode("utf-8")

            file_list.append(file_info)

    return jsonify({
        "email": email,
        "surveys": file_list
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
