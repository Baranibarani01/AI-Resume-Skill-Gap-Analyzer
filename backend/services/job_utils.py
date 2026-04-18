def match_jobs(skills):
    return [
        {
            "role": "Frontend Developer",
            "match_score": 85,
            "missing_skills": ["React", "Tailwind CSS"]
        },
        {
            "role": "Backend Developer",
            "match_score": 72,
            "missing_skills": ["FastAPI", "SQL"]
        }
    ]