from pydantic import BaseModel
from typing import List


class Question(
    BaseModel
):

    difficulty: str

    question: str

    answer: str


class QuestionsResponse(
    BaseModel
):

    project_id: str

    questions: List[
        Question
    ]