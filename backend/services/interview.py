def generate_questions(skills):
    questions = []

    if "python" in [skill.lower() for skill in skills]:
        questions.append({
            "skill": "Python",
            "questions": [
                "What is the difference between a list and a tuple in Python?",
                "What are Python decorators?",
                "Explain the difference between == and is in Python."
            ]
        })

    if "machine learning" in [skill.lower() for skill in skills]:
        questions.append({
            "skill": "Machine Learning",
            "questions": [
                "What is the difference between supervised and unsupervised learning?",
                "What is overfitting in machine learning?",
                "Explain the purpose of a training dataset."
            ]
        })

    return questions