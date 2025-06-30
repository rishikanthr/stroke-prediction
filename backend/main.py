from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import joblib
import tensorflow as tf

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (update allow_origins in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and preprocessor
model = tf.keras.models.load_model("stroke_model.keras")
preprocessor = joblib.load("preprocessor.pkl")

# Define input structure
class StrokeInput(BaseModel):
    gender: str
    age: float
    hypertension: int
    heart_disease: int
    ever_married: str
    work_type: str
    Residence_type: str
    avg_glucose_level: float
    bmi: float
    smoking_status: str
    
@app.post("/predict")
def predict_stroke(data: StrokeInput):
    try:
        input_dict = data.dict()
        print("Input received:", input_dict)

        input_df = pd.DataFrame([input_dict])

        # Transform
        X = preprocessor.transform(input_df)
        print("X shape before reshape:", X.shape)

        # Fix shape mismatch here
        X = X.reshape((X.shape[0], X.shape[1], 1))
        print("X shape after reshape:", X.shape)

        prob = model.predict(X)[0][0]
        result = "Stroke" if prob > 0.5 else "No Stroke"

        return {
            "prediction": result,
            "probability": round(float(prob), 4)
        }

    except Exception as e:
        print("Prediction error:", str(e))
        return {"error": str(e)}
