import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

// Function to get the current time in HH:MM:SS format
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { hour12: false }); // 24-hour format
};

function App() {
  // Generate initial data with real-time timestamps
  const generateInitialData = () =>
    Array.from({ length: 10 }, () => ({
      time: getCurrentTime(),
      temperature: Math.floor(Math.random() * 10) + 20,
      humidity: Math.floor(Math.random() * 10) + 50,
    }));

  const [data, setData] = useState(generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newEntry = {
          time: getCurrentTime(),
          temperature: Math.floor(Math.random() * 10) + 20,
          humidity: Math.floor(Math.random() * 10) + 50,
        };

        return [...prevData.slice(1), newEntry]; // Keep last 10 entries
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Digital Twin Dashboard</h2>

      <div className="info-cards">
        <div className="card" style={{ boxShadow: "0 0 15px cyan" }}>
          <h5 style={{ color: "cyan" }}>Temperature</h5>
          <h1 style={{ color: "cyan" }}>{data[data.length - 1].temperature}°C</h1>
        </div>
        <div className="card" style={{ boxShadow: "0 0 15px magenta" }}>
          <h5 style={{ color: "magenta" }}>Humidity</h5>
          <h1 style={{ color: "magenta" }}>{data[data.length - 1].humidity}%</h1>
        </div>
      </div>

      <div className="chart-container">
        <h4>Live Sensor Data</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="cyan"
              strokeWidth={3}
              dot={{ fill: "cyan", r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="magenta"
              strokeWidth={3}
              dot={{ fill: "magenta", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
