from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import os

# Initialize the FastAPI app
app = FastAPI()

# Configure CORS
origins = [
    "https://your-frontend.netlify.app",  # Replace with your Netlify URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to store uploaded files
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Route to handle file upload
@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    # Ensure the file is an MP3 file
    if file.content_type != "audio/mpeg":
        return JSONResponse(content={"error": "Only MP3 files are allowed"}, status_code=400)

    # Save the uploaded file to the 'uploads' directory
    file_location = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_location, "wb") as f:
        f.write(await file.read())

    # Process the file and generate questions (dummy data for now)
    questions = [
        "What is your location?",
        "What is the nature of the emergency?"
    ]

    # Return the questions list as JSON
    return {"questions": questions}