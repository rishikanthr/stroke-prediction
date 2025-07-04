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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/predict`, formData);
      setResult(res.data);
    } catch (err) {
      alert("Prediction failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
          <div className="absolute top-4 left-4 w-24 h-24 border-4 border-transparent border-t-pink-400 border-r-blue-400 rounded-full animate-spin animate-reverse"></div>
          <div className="absolute top-8 left-8 w-16 h-16 border-4 border-transparent border-t-green-400 border-r-yellow-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-lg font-bold animate-pulse">🧠</div>
          </div>
        </div>
        <div className="ml-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Analyzing Your Data...</h2>
          <p className="text-lg opacity-80">AI is processing your health parameters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden font-[Poppins]">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {!result ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-5xl"
          >
            <h1 className="text-center text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-10">
              🧠 Stroke Risk Prediction
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
                { label: "Age", name: "age", type: "number" },
                { label: "Hypertension", name: "hypertension", type: "select", options: ["Yes", "No"] },
                { label: "Heart Disease", name: "heart_disease", type: "select", options: ["Yes", "No"] },
                { label: "Married", name: "ever_married", type: "select", options: ["Yes", "No"] },
                { label: "Work Type", name: "work_type", type: "select", options: ["Private", "Self-employed", "Govt_job", "Never_worked"] },
                { label: "Residence Type", name: "Residence_type", type: "select", options: ["Urban", "Rural"] },
                { label: "Avg Glucose Level", name: "avg_glucose_level", type: "number", step: "0.01" },
                { label: "BMI", name: "bmi", type: "number", step: "0.1" },
                { label: "Smoking Status", name: "smoking_status", type: "select", options: ["Never smoked", "Formerly smoked", "Smokes"] }
              ].map(({ label, name, type, options, step }) => (
                <div key={name}>
                  <label className="block text-white font-medium mb-2">{label}</label>
                  {type === "select" ? (
                    <select
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                    >
                      <option value="">Select</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt} className="text-black">{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      step={step}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-xl placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-xl rounded-2xl shadow-xl hover:scale-105 transition-all"
              >
                🧠 Analyze Risk
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-xl text-center">
            <div className="text-8xl mb-6 animate-bounce">🧠</div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              Analysis Complete
            </h2>
            <div className={`text-6xl font-bold mb-4 ${result.prediction === "Stroke" ? "text-red-400 animate-pulse" : "text-green-400"}`}>
              {result.prediction}
            </div>
            <p className="text-xl text-white/80 mb-6">
              Probability: <span className="font-semibold">{result.probability}</span>
            </p>
            <button
              onClick={() => setResult(null)}
              className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all"
            >
              🔄 New Prediction
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
