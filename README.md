🧠 Stroke Risk Prediction System
This project presents an AI-powered stroke risk prediction tool that combines Machine Learning (ML) and Deep Learning (DL) models to assess a person's likelihood of experiencing a stroke based on health data. It is designed to enable early diagnosis and promote preventive care, especially in rural or underserved regions.

🚀 Key Features
Dual-model pipeline: Logistic Regression, Random Forest, CNN, and LSTM for robust performance.
Imbalanced data handling: Uses SMOTE (Synthetic Minority Oversampling Technique) to improve detection of minority stroke cases.
Custom thresholding: Tuned decision threshold (e.g., 0.4) to reduce false negatives—critical in medical applications.
Explainability: Includes SHAP-based feature importance for transparent predictions.
Scalability: Lightweight and can be deployed in mobile or cloud-based environments for real-time prediction.
📊 Dataset Features
The system uses medical parameters such as:

Age, Hypertension, Heart Disease
Glucose Levels, BMI, Gender, Smoking Status, and more.
🏗️ Tech Stack
Python
Scikit-learn, TensorFlow/Keras
Pandas, NumPy, Matplotlib, SHAP
Imbalanced-learn (SMOTE)
Google Colab
📈 Results
The models demonstrated strong performance:

Accuracy: ~94%
F1 Score & ROC AUC: High scores across the board
Balanced performance for both stroke and non-stroke classes.
🧪 Architecture & Workflow
Data Preprocessing
SMOTE Oversampling
Model Training (ML + DL)
Threshold Tuning
Evaluation & Explainability
Real-time Prediction Ready
🤝 Contributing
Feel free to fork this repo and suggest improvements or add new models.
