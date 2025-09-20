import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  // State for selected mood
  const [mood, setMood] = useState("");
  const [moodData, setMoodData] = useState([
    { date: "2025-09-16", mood: "Happy" },
    { date: "2025-09-17", mood: "Stressed" },
    { date: "2025-09-18", mood: "Happy" },
  ]);
  const [tip, setTip] = useState("");

  // Convert mood to a number for the chart
  const moodToNumber = (m) => {
    switch (m) {
      case "Happy": return 5;
      case "Stressed": return 2;
      case "Sad": return 1;
      case "Anxious": return 2;
      case "Tired": return 3;
      default: return 0;
    }
  };

  // Provide a wellness tip based on mood
  const getTip = (m) => {
    switch (m) {
      case "Happy": return "Keep up the good vibes! 😊";
      case "Stressed": return "Take a 5-minute break and breathe deeply. 🌿";
      case "Sad": return "Reach out to a friend or listen to uplifting music. 🎵";
      case "Anxious": return "Try a short meditation or grounding exercise. 🧘‍♀️";
      case "Tired": return "Get some rest or a quick power nap. 😴";
      default: return "";
    }
  };

  // Handle mood submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood) return alert("Please select a mood!");
    const today = new Date().toISOString().split("T")[0];
    setMoodData([...moodData, { date: today, mood }]);
    setTip(getTip(mood));
    setMood("");
  };

  // Prepare chart data
  const moodColors = {
  Happy: "rgba(255, 206, 86, 0.6)",     // Yellow
  Sad: "rgba(54, 162, 235, 0.6)",       // Blue
  Stressed: "rgba(255, 99, 132, 0.6)",  // Red
  Anxious: "rgba(153, 102, 255, 0.6)",  // Purple
  Tired: "rgba(201, 203, 207, 0.6)",    // Gray
};
  const chartData = {
     labels: moodData.map((entry) => entry.date),
  datasets: [
    {
      label: "Mood Level",
      data: moodData.map((entry) => moodToNumber(entry.mood)),
      backgroundColor: moodData.map((entry) => moodColors[entry.mood] || "#ccc"), 
    },
  ],
};

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Mood Trends" },
    },
  };
return (
  <div className="App">
    <h1>MoodBoost</h1>

    {/* Mood form */}
    <form onSubmit={handleSubmit}>
      <label>Select your mood: </label>
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">--Choose--</option>
        <option value="Happy">😊 Happy</option>
        <option value="Sad">😢 Sad</option>
        <option value="Stressed">😫 Stressed</option>
        <option value="Anxious">😰 Anxious</option>
        <option value="Tired">😴 Tired</option>
      </select>
      <button type="submit">Log Mood</button>
    </form>

    {/* Chart */}
    <div style={{ width: "100%", margin: "0 auto" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>

    {/* Wellness tip */}
    {tip && <div className="tip">Wellness Tip: {tip}</div>}
  </div>
);

}

export default App;
