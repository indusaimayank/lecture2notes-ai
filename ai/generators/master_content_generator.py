from ai.generators.notes_generator import (
    NotesGenerator
)

from ai.generators.revision_generator import (
    RevisionGenerator
)

from ai.generators.summary_generator import (
    SummaryGenerator
)

from ai.generators.flashcard_generator import (
    FlashcardGenerator
)

from ai.generators.formula_generator import (
    FormulaGenerator
)

from ai.generators.cheat_sheet_generator import (
    CheatSheetGenerator
)

from ai.generators.mcq_generator import (
    MCQGenerator
)

from ai.generators.interview_generator import (
    InterviewGenerator
)


class MasterContentGenerator:

    def __init__(self):

        self.notes = NotesGenerator()
        self.revision = RevisionGenerator()
        self.summary = SummaryGenerator()
        self.flashcards = FlashcardGenerator()
        self.formulas = FormulaGenerator()
        self.cheatsheet = CheatSheetGenerator()
        self.mcq = MCQGenerator()
        self.interview = InterviewGenerator()

    def generate(
        self,
        knowledge: dict
    ):

        return {

            "notes":
                self.notes.generate(
                    knowledge
                ),

            "revision":
                self.revision.generate(
                    knowledge
                ),

            "summary":
                self.summary.generate(
                    knowledge
                ),

            "flashcards":
                self.flashcards.generate(
                    knowledge
                ),

            "formulas":
                self.formulas.generate(
                    knowledge
                ),

            "cheatsheet":
                self.cheatsheet.generate(
                    knowledge
                ),

            "mcqs":
                self.mcq.generate(
                    knowledge
                ),

            "interview":
                self.interview.generate(
                    knowledge
                )
        }