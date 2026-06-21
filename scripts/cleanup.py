from pathlib import Path
import shutil


PROJECTS_DIR = Path(
    "project_data/projects"
)


def cleanup():

    for project in PROJECTS_DIR.iterdir():

        chunks = project / "chunks"

        if chunks.exists():

            shutil.rmtree(chunks)

            print(
                f"Deleted: {chunks}"
            )


if __name__ == "__main__":

    cleanup()