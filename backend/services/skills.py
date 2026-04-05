SKILLS_DB = [
    "python",
    "sql",
    "machine learning",
    "data analysis",
    "pandas",
    "numpy",
    "excel",
    "power bi",
    "tableau",
    "django",
    "flask",
    "html",
    "css",
    "javascript",
    "react",
    "git",
    "api"
]

def extract_skills(text):
    text = text.lower()
    found_skills = []

    for skill in SKILLS_DB:
        if skill in text:
            found_skills.append(skill)

    return found_skills