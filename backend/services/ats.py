REQUIRED_SECTIONS = [
    "education",
    "skills",
    "projects",
    "experience"
]

KEYWORDS = [
    "python",
    "sql",
    "machine learning",
    "data analysis",
    "git"
]


def calculate_ats_score(text, skills):
    score = 0

    # 1. Skills score (40)
    score += min(len(skills) * 10, 40)

    # 2. Section score (20)
    section_score = 0
    lower_text = text.lower()

    for section in REQUIRED_SECTIONS:
        if section in lower_text:
            section_score += 5

    score += section_score

    # 3. Keyword score (20)
    keyword_score = 0
    for keyword in KEYWORDS:
        if keyword in lower_text:
            keyword_score += 4

    score += min(keyword_score, 20)

    # 4. Projects/experience score (20)
    if "project" in lower_text:
        score += 10

    if "experience" in lower_text:
        score += 10

    return min(score, 100)