from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.parser import extract_text_from_pdf
from services.skills import extract_skills
from services.ats import calculate_ats_score
from services.chatbot import chatbot_reply
from services.job_utils import match_jobs
from services.interview import generate_questions

app = FastAPI()

# Enable frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Course recommendations
COURSES = {
    "machine learning": {
        "course": "Machine Learning by Andrew Ng",
        "platform": "Coursera"
    },
    "react": {
        "course": "React Complete Guide",
        "platform": "Udemy"
    },
    "django": {
        "course": "Django for Beginners",
        "platform": "Udemy"
    },
    "javascript": {
        "course": "JavaScript Basics",
        "platform": "Coursera"
    },
    "sql": {
        "course": "SQL for Data Science",
        "platform": "Coursera"
    },
    "python": {
        "course": "Python for Everybody",
        "platform": "Coursera"
    }
}


@app.get("/")
def home():
    return {
        "message": "AI Resume + Skill Gap Analyzer API Running"
    }


@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    # Extract resume text
    text = extract_text_from_pdf(file.file)

    # Extract skills
    skills = extract_skills(text)

    # ATS score
    ats_score = calculate_ats_score(text, skills)

    # Job matching
    job_matches = match_jobs(skills)

    # Course recommendations
    recommended_courses = []

    if len(job_matches) > 0:
        top_missing_skills = job_matches[0]["missing_skills"]

        for skill in top_missing_skills:
            if skill in COURSES:
                recommended_courses.append({
                    "skill": skill,
                    "course": COURSES[skill]["course"],
                    "platform": COURSES[skill]["platform"]
                })

    # Personalized roadmap
    roadmap = []

    if len(job_matches) > 0:
        month = 1

        for skill in job_matches[0]["missing_skills"]:
            roadmap.append({
                "month": month,
                "focus": f"Learn {skill.title()}",
                "goal": f"Complete a course and build one project using {skill.title()}"
            })
            month += 1

    # Interview questions
    questions = []

    if len(job_matches) > 0:
        missing = job_matches[0]["missing_skills"]
        questions = generate_questions(missing)

    # Resume improvement tips
    resume_tips = []

    if ats_score < 80:
        resume_tips.append("Add more technical skills related to your target role.")
        resume_tips.append("Include project experience with measurable results.")
        resume_tips.append("Mention tools, frameworks, certifications, and internships.")
        resume_tips.append("Use proper section headings like Skills, Projects, Education, Experience.")

    return {
        "skills": skills,
        "ats_score": ats_score,
        "job_matches": job_matches,
        "courses": recommended_courses,
        "roadmap": roadmap,
        "questions": questions,
        "resume_tips": resume_tips
    }


# Chatbot request model
class ChatRequest(BaseModel):
    question: str


@app.post("/chat")
def chat(request: ChatRequest):
    answer = chatbot_reply(request.question)

    return {
        "question": request.question,
        "answer": answer
    }