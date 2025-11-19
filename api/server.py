import os
import re
import json
import csv
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

os.environ["OPENAI_API_KEY"] = (
    "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"
)


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


def collect_feedback(files):
    feedbacks = []

    for key, file in files.items():
        file.stream.seek(0)
        reader = csv.reader(file.stream.read().decode("utf-8").splitlines())
        feedback = [", ".join(row) for row in reader]

        if feedback:
            feedbacks.append({"header": feedback[0], "data": feedback[1:]})

    if not feedbacks:
        return None, {"error": "No feedback found in the uploaded files."}, 400

    return feedbacks, None, None


def truncate_sentence(text):
    sentences = re.findall(r"([A-Z][^.!?]*[.!?])", text)
    return " ".join(sentences)


def analyze_feedback(process_type, instruction, max_tokens=1024, temperature=0.5):
    id = request.form.get("id")
    email = request.form.get("email")
    files = request.files.to_dict()
    if not files:
        return jsonify({"error": "No files uploaded."}), 400

    feedbacks, error_response, error_code = collect_feedback(files)
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
    )


@app.route("/analyze-summary", methods=["POST"])
def analyze_bulk_summary():
    return analyze_feedback("summary", "Summarise the given text: {}.")


@app.route("/analyze-sentiment", methods=["POST"])
def analyze_bulk_sentiment():
    return analyze_feedback(
        "sentiments",
        "Provide a detailed sentiment analysis of the given text and score in words - POSITIVE or NEGATIVE: {}.",
    )


@app.route("/analyze-action-plan", methods=["POST"])
def analyze_action_plan():
    return analyze_feedback(
        "actionPlan", "Provide a strategic business action plan for the given text: {}."
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
