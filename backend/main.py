from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.routes.health import (
    router as health_router
)

from backend.api.routes.projects import (
    router as projects_router
)

from backend.api.routes.youtube import (
    router as youtube_router
)

from backend.api.routes.transcript import (
    router as transcript_router
)

from backend.api.routes.notes import (
    router as notes_router
)


app = FastAPI(
    title="Lecture2Notes AI",
    description=(
        "AI-powered lecture-to-notes platform "
        "for transcripts, notes generation, "
        "knowledge extraction and study material creation."
    ),
    version="1.0.0",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Routers
# --------------------------------------------------

app.include_router(
    health_router
)

app.include_router(
    projects_router
)

app.include_router(
    youtube_router
)

app.include_router(
    transcript_router
)

app.include_router(
    notes_router
)


# --------------------------------------------------
# Root
# --------------------------------------------------

@app.get(
    "/",
    tags=["Root"]
)
async def root():

    return {
        "name": "Lecture2Notes AI",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "redoc": "/redoc",
    }


# --------------------------------------------------
# Startup Event
# --------------------------------------------------

@app.on_event("startup")
async def startup_event():

    print(
        "Lecture2Notes AI API started."
    )


# --------------------------------------------------
# Shutdown Event
# --------------------------------------------------

@app.on_event("shutdown")
async def shutdown_event():

    print(
        "Lecture2Notes AI API stopped."
    )