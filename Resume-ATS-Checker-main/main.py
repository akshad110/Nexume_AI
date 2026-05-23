from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PyPDF2 import PdfReader
import google.generativeai as genai
import os
import io

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-3.1-flash-lite")

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "ATS Resume Analyzer"})


def pdf_to_data(pdf_bytes):
    reader = PdfReader(pdf_bytes)
    parts = []
    for page in reader.pages:
        parts.append(page.extract_text() or "")
    return "\n".join(parts).strip()


def extract_text_from_upload(upload_file):
    """Extract text from uploaded file (PDF or TXT)."""
    filename = (upload_file.filename or "").lower()
    raw = upload_file.read()

    if filename.endswith(".txt") or upload_file.content_type == "text/plain":
        return raw.decode("utf-8", errors="replace").strip()

    is_pdf = (
        filename.endswith(".pdf")
        or upload_file.content_type in ("application/pdf", "application/octet-stream")
        or not upload_file.content_type
    )

    if is_pdf:
        return pdf_to_data(io.BytesIO(raw))

    return ""


@app.route("/analyze", methods=["POST"])
def analyze_resume():
    try:
        job_description = request.form.get("job_description", "").strip()
        upload_file = request.files.get("resume")
        resume_text = request.form.get("resume_text", "").strip()

        if not job_description:
            return jsonify({
                "success": False,
                "message": "Job description is required",
            }), 400

        if resume_text:
            resume_data = resume_text
        elif upload_file:
            resume_data = extract_text_from_upload(upload_file)
        else:
            return jsonify({
                "success": False,
                "message": "Resume file or resume text is required",
            }), 400

        if not resume_data or not resume_data.strip():
            return jsonify({
                "success": False,
                "message": (
                    "Could not read resume content. Use Check ATS from the resume "
                    "editor, upload a TXT file, or download a fresh PDF from Nexume."
                ),
            }), 400

        content = f"""
You are an expert in Resume Screening and ATS Optimization.

Analyze the following job description and resume, and provide:

1. Match Score (0–100)
2. Missing Keywords/Skills
3. Role Alignment
4. Suggestions for Improvement

Job Description:
{job_description}

Resume:
{resume_data}
"""

        response = model.generate_content(content)

        return jsonify({
            "success": True,
            "analysis": response.text,
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
