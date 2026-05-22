# from dotenv import load_dotenv
# import os
# import streamlit as st
# from PyPDF2 import PdfReader
# import io
# import google.generativeai as genai

# # Load environment variable
# load_dotenv()
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# genai.configure(api_key=GEMINI_API_KEY)

# model = genai.GenerativeModel("gemini-3.1-flash-lite")

# # Page Config for better UX
# st.set_page_config(
#     page_title="ATS Resume Checker",
#     page_icon="📝",
#     layout="centered",
#     initial_sidebar_state="auto"
# )

# #  Custom Styling 
# st.markdown("""
#     <style>
#         .title-style {
#             text-align: center;
#             font-size: 2.5rem;
#             color: #4285F4;
#             font-weight: bold;
#             margin-bottom: 0;
#         }
#         .sub-style {
#             text-align: center;
#             font-size: 1rem;
#             color: #5f6368;
#             margin-top: 0;
#         }
#         .stButton>button {
#             background-color: #4285F4;
#             color: white;
#             border-radius: 8px;
#             padding: 10px 24px;
#             font-size: 16px;
#         }
#     </style>
# """, unsafe_allow_html=True)

# #  Header
# st.markdown('<p class="title-style">ATS Resume Checker</p>', unsafe_allow_html=True)
# st.markdown('<p class="sub-style">Get insights & suggestions based on your resume and job description</p>', unsafe_allow_html=True)

# # Streamlit Inputs 
# with st.form("ats_form"):
#     job_description = st.text_area("📄 Paste the Job Description", height=200, placeholder="Enter job details here...")
#     upload_file = st.file_uploader("📎 Upload Your Resume (PDF or TXT)", type=["pdf", "txt"])
#     submitted = st.form_submit_button("🚀 Analyze Resume")

# #  PDF/Text to String 
# def pdf_to_data(pdf_file):
#     reader = PdfReader(pdf_file)
#     num_of_pages = len(reader.pages)
#     text = "\n"
#     for i in range(num_of_pages):
#         page = reader.pages[i]
#         text += page.extract_text() or ""
#     return text

# def extract_text(upload_file):
#     file_type = upload_file.type
#     if file_type == "application/pdf":
#         with io.BytesIO(upload_file.read()) as file_bytes:
#             return pdf_to_data(file_bytes)
#     elif file_type == "text/plain":
#         return upload_file.read().decode("utf-8")

# #  Gemini Resume Analysis 
# # 
# def ATS_Resume_Score_and_Suggestion(upload_file, job_description):
#     resume_data = extract_text(upload_file)

#     content = f"""
# You are an expert in Resume Screening and ATS Optimization.

# Analyze the following job description and resume, and provide:

# 1. Match Score (0–100)
# 2. Missing Keywords/Skills
# 3. Role Alignment
# 4. Suggestions for Improvement

# Job Description:
# {job_description}

# Resume:
# {resume_data}
# """

#     response = model.generate_content(content)

#     st.markdown("### 📝 Analysis Report")
#     st.markdown(response.text)

# #  Run Analysis 
# if submitted and job_description and upload_file:
#     with st.spinner("🔍 Analyzing your resume... Please wait."):
#         ATS_Resume_Score_and_Suggestion(upload_file, job_description)
# elif submitted:
#     st.warning("⚠️ Please make sure both Job Description and Resume are provided.")


from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PyPDF2 import PdfReader
import google.generativeai as genai
import os
import io

# Load env variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-3.1-flash-lite")

# Flask App
app = Flask(__name__)

# Enable CORS
CORS(app)


# PDF/Text Extraction
def pdf_to_data(pdf_file):
    reader = PdfReader(pdf_file)

    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    return text


def extract_text(upload_file):

    file_type = upload_file.content_type

    if file_type == "application/pdf":

        pdf_bytes = io.BytesIO(upload_file.read())

        return pdf_to_data(pdf_bytes)

    elif file_type == "text/plain":

        return upload_file.read().decode("utf-8")

    return ""


# ATS Analyzer API
@app.route("/analyze", methods=["POST"])
def analyze_resume():

    try:

        job_description = request.form.get("job_description")

        upload_file = request.files.get("resume")

        if not job_description or not upload_file:

            return jsonify({
                "success": False,
                "message": "Job description and resume are required"
            }), 400

        resume_data = extract_text(upload_file)

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
            "analysis": response.text
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# Run Flask
if __name__ == "__main__":
    app.run(debug=True)