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
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Importing custom styles

const IoTDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toLocaleTimeString(),
        temperature: Math.floor(Math.random() * 20) + 20, // 20-40°C
        humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
      };
      setData((prevData) => [...prevData.slice(-14), newData]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const latestTemp = data.length ? data[data.length - 1].temperature : "--";
  const latestHumidity = data.length ? data[data.length - 1].humidity : "--";

  return (
    <div className="dashboard-container">
      <h2 className="title">AI-Powered IoT Dashboard</h2>

      <div className="info-cards">
        <div className="card temperature">
          <h5>Temperature</h5>
          <h1>{latestTemp}°C</h1>
        </div>
        <div className="card humidity">
          <h5>Humidity</h5>
          <h1>{latestHumidity}%</h1>
        </div>
      </div>

      <div className="chart-container">
        <h4>Real-Time Analytics</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="white" />
            <YAxis stroke="white" />
            <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" />
            <Tooltip wrapperStyle={{ backgroundColor: "black", color: "white" }} />
            <Line type="monotone" dataKey="temperature" stroke="#FF5733" strokeWidth={3} />
            <Line type="monotone" dataKey="humidity" stroke="#3498db" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IoTDashboard;
