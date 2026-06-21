class Lecture2NotesException(
    Exception
):
    pass


class AudioProcessingError(
    Lecture2NotesException
):
    pass


class TranscriptionError(
    Lecture2NotesException
):
    pass


class NotesGenerationError(
    Lecture2NotesException
):
    pass


class ValidationError(
    Lecture2NotesException
):
    pass