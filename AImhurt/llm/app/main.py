from fastapi import FastAPI
from pydantic import BaseModel
import rag


app = FastAPI()




class PredictionOutput(BaseModel):
    prediction: str

class PredictionInput(BaseModel):
    query:str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the ML API!"}

@app.post("/predict", response_model=PredictionOutput)
async def predict(input: PredictionInput):
    
    model = rag.Model()
    
    return_string = model.ask(input.query)
    return PredictionOutput(return_string)
    
