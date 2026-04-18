def extract_skills(text):
    skill_keywords = [
        "Python",
        "SQL",
        "Machine Learning",
        "Django",
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Git",
        "API"
    ]

    found_skills = []

    for skill in skill_keywords:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    return found_skills