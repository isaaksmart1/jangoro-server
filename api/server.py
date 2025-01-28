import os
import re
import json
import csv

# import pandas as pd
from openai import OpenAI

from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

os.environ["OPENAI_API_KEY"] = (
    "sk-proj-wByn21XgxyR6cGFy1FGJT3BlbkFJT7lRyYFFlKbnOKUl8mom"  # openai key
)
# os.environ["OPENAI_API_KEY"] = "sk-d69db7a1b74c46afb6447fa963518fe0"  # deepseek key
# os.environ["OPENAI_API_KEY"] = "sk-31346ac61b3e45218d2fec08d82e0023"  # idearify deepseek


def generate(combined_feedback, agent_text, max_tokens=256):
    system_prompt = (
        "You are an expert in analyzing customer Surveys and Reviews; a state-of-the-art analysis tool."
        + agent_text
    )
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
        # base_url="https://api.deepseek.com",
    )
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": combined_feedback},
        ],
        model="gpt-4o-mini",
        # model="deepseek-chat",
        max_tokens=max_tokens,  # Limit response tokens to avoid exceeding context length
        temperature=0.7,  # Adjust for creative vs. deterministic responses
    )
    return chat_completion


import csv


def collect_feedback(feedbacks, files):
    feedback = []
    # Process each CSV file
    for key, file in files.items():
        # Read the CSV file
        file.stream.seek(0)  # Ensure the file pointer is at the start
        reader = csv.reader(file.stream.read().decode("utf-8").splitlines())

        # Collect feedbacks from CSV rows
        for row in reader:
            f = ", ".join([str(r) for r in row])
            feedback.append(f)

        feedbacks.append(feedback)

    if not feedback:
        return jsonify({"error": "No feedback found in the uploaded files."}), 400

    return feedbacks


# def collect_feedback(feedbacks, files):
#     feedback = []
#     # Process each CSV file
#     for key, file in files.items():
#         # Read the CSV file into a DataFrame
#         df = pd.read_csv(file)

#         # Collect feedbacks from CSV rows
#         for _, row in df.iterrows():
#             f = ", ".join([str(r) for r in row])
#             feedback.append(f)

#         feedbacks.append(feedback)

#     if not feedback:
#         return jsonify({"error": "No feedback found in the uploaded files."}), 400

#     return feedbacks


def truncate_sentence(s):
    # Regex pattern to capture only complete sentences
    pattern = r"([A-Z][^.!?]*[.!?])"

    # Find all complete sentences
    complete_sentences = re.findall(pattern, s)

    # Join the sentences back into a string
    c = " ".join(complete_sentences)

    return c


@app.route("/analyze-refinement", methods=["POST"])
def analyze_bulk_refinement():
    feedbacks = []
    refine = []

    # Retrieve files as a dictionary
    files = request.files.to_dict()
    keys = list(request.files.keys())

    if not files:
        return jsonify({"error": "No files uploaded."}), 400

    # Collect feedback from files (assumes this function is defined elsewhere)
    feedbacks = collect_feedback(feedbacks=feedbacks, files=files)

    i = 0
    for feedback in feedbacks:
        # Combine feedback into one text
        combined_feedback = " ".join(feedback)
        system_prompt = f"Create a refined survey from the given text: {combined_feedback}. Must be clear, readable and formatted as a survey."

        try:
            # OpenAI API call to generate a refinement
            chat_completion = generate(
                combined_feedback, system_prompt, max_tokens=1024
            )

            # Extract the content from the API response
            s = chat_completion.model_dump_json()
            s = json.loads(s)["choices"][0]["message"]["content"].strip()

            # Join the sentences back into a string
            r = truncate_sentence(s)
            d = {}
            d[keys[i]] = r
            refine.append(d)
            i = i + 1

        except Exception as e:
            print({"error": f"Failed to generate summary: {str(e)}"})
            return jsonify({"error": f"Failed to generate summary: {str(e)}"}), 500

    # Return the summary
    return jsonify({"refinement": refine})


@app.route("/analyze-summary", methods=["POST"])
def analyze_bulk_summary():
    feedbacks = []
    summary = []

    # Retrieve files as a dictionary
    files = request.files.to_dict()
    keys = list(request.files.keys())

    if not files:
        return jsonify({"error": "No files uploaded."}), 400

    # Collect feedback from files (assumes this function is defined elsewhere)
    feedbacks = collect_feedback(feedbacks=feedbacks, files=files)

    i = 0
    for feedback in feedbacks:
        # Combine feedback into one text
        combined_feedback = " ".join(feedback)

        system_prompt = f"Summarize the given text: {combined_feedback}."

        try:
            # OpenAI API call to generate a summary
            chat_completion = generate(combined_feedback, system_prompt)
            # Extract the content from the API response
            s = chat_completion.model_dump_json()
            s = json.loads(s)["choices"][0]["message"]["content"].strip()

            # Join the sentences back into a string
            s = truncate_sentence(s)
            d = {}
            d[keys[i]] = s
            summary.append(d)
            i = i + 1

        except Exception as e:
            return jsonify({"error": f"Failed to generate summary: {str(e)}"}), 500

    # Return the summary
    return jsonify({"summary": summary})


@app.route("/analyze-sentiment", methods=["POST"])
def analyze_bulk_sentiment():
    feedbacks = []
    sentiments = []

    # Retrieve files as a dictionary
    files = request.files.to_dict()
    keys = list(request.files.keys())

    if not files:
        return jsonify({"error": "No files uploaded."}), 400

    # Collect feedback from files (assumes this function is defined elsewhere)
    feedbacks = collect_feedback(feedbacks=feedbacks, files=files)

    i = 0
    for feedback in feedbacks:
        # Combine feedback into one text
        combined_feedback = " ".join(feedback)
        system_prompt = f"Provide a detailed sentiment analysis of the given text and score in words - POSITIVE or NEGATIVE {combined_feedback}."

        try:
            # OpenAI API call to generate a refinement
            chat_completion = generate(
                combined_feedback, system_prompt, max_tokens=1024
            )

            # Extract the content from the API response
            s = chat_completion.model_dump_json()
            s = json.loads(s)["choices"][0]["message"]["content"].strip()

            # Join the sentences back into a string
            s = truncate_sentence(s)
            d = {}
            d[keys[i]] = s
            sentiments.append(d)
            i = i + 1

        except Exception as e:
            print({"error": f"Failed to generate summary: {str(e)}"})
            return jsonify({"error": f"Failed to generate summary: {str(e)}"}), 500

    # Return the sentiment
    return jsonify({"sentiments": sentiments})


if __name__ == "__main__":
    app.run(debug=True)
