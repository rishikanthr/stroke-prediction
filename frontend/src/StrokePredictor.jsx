import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
export default function StrokeForm() {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: 0,
    heart_disease: 0,
    ever_married: "",
    work_type: "",
    Residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["hypertension", "heart_disease"].includes(name)) {
      setFormData({ ...formData, [name]: value === "Yes" ? 1 : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/predict`, formData);
      setResult(res.data);
    } catch (err) {
      alert("Prediction failed");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 p-4`}>
      {!result ? (
        <div className="max-w-4xl w-full p-6 border rounded-lg shadow-md bg-white">
          <h1 className="text-2xl font-bold mb-6 text-center">🧠 Stroke Prediction</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT SIDE */}
              <div className="space-y-4">
                <div>
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label>Hypertension</label>
                  <select name="hypertension" onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label>Heart Disease</label>
                  <select name="heart_disease" onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label>Married</label>
                  <select name="ever_married" value={formData.ever_married} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-4">
                <div>
                  <label>Work Type</label>
                  <select name="work_type" value={formData.work_type} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Select</option>
                    <option>Private</option>
                    <option>Self-employed</option>
                    <option>Govt_job</option>
                    <option>Never_worked</option>
                  </select>
                </div>

                <div>
                  <label>Residence Type</label>
                  <select name="Residence_type" value={formData.Residence_type} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Select</option>
                    <option>Urban</option>
                    <option>Rural</option>
                  </select>
                </div>

                <div>
                  <label>Avg Glucose Level</label>
                  <input type="number" step="0.01" name="avg_glucose_level" value={formData.avg_glucose_level} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label>BMI</label>
                  <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>

                <div>
                  <label>Smoking Status</label>
                  <select name="smoking_status" value={formData.smoking_status} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="">Select</option>
                    <option>Never smoked</option>
                    <option>Formerly smoked</option>
                    <option>Smokes</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Predict</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">🧠 Prediction Result</h2>
          <p className="text-lg">
            You are predicted:{" "}
            <span className={result.prediction === "Stroke" ? "text-red-600" : "text-green-600"}>
              {result.prediction}
            </span>
          </p>
          <p className="mt-2 text-sm text-gray-600">Probability: {result.probability}</p>

          <button
            className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setResult(null)}
          >
            Predict Again
          </button>
        </div>
      )}
    </div>
  );
}
