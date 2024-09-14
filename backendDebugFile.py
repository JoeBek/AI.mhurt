from fastapi import FastAPI, Request, File, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import os

# Initialize the FastAPI app
app = FastAPI()

# Set up Jinja2 templates
templates = Jinja2Templates(directory="templates")

# Directory to store uploaded files
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Ensure the 'static' directory exists
STATIC_FOLDER = "static"
os.makedirs(STATIC_FOLDER, exist_ok=True)


# Serve static files (for JS, CSS, etc.)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Route to display the file upload form
@app.get("/", response_class=HTMLResponse)
async def get_form(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Route to handle file upload
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Ensure the file is an MP3 file
    if file.content_type != "audio/mpeg":
        return {"error": "Only MP3 files are allowed"}

    # Save the uploaded file to the 'uploads' directory
    file_location = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_location, "wb") as f:
        f.write(await file.read())

    # Return success response
    return {"success": True, "filename": file.filename}
