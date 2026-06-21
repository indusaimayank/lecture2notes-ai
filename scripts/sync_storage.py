from pathlib import Path


def sync():

    projects = Path(
        "project_data/projects"
    )

    count = len(
        list(projects.iterdir())
    )

    print(
        f"Found {count} projects."
    )


if __name__ == "__main__":

    sync()