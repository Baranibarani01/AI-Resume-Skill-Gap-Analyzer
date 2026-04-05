def chatbot_reply(question):
    question = question.lower()

    if "after python" in question:
        return "Learn SQL, then Machine Learning, then build one project."

    if "frontend" in question:
        return "Learn HTML, CSS, JavaScript, and React."

    return "Please ask about a skill or career path."