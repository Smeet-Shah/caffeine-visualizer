import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const CaffeineGraph = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-orange-500">
          <p className="text-orange-400 font-semibold">Time: {label} hours</p>
          <p className="text-white">
            Caffeine: {Math.round(payload[0].value)} mg
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-gray-800 rounded-xl p-6 shadow-2xl">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.4} />
            <XAxis 
              dataKey="time" 
              label={{ value: "Hours", position: "insideBottom", dy: 10, fill: "#fff" }}
              tick={{ fill: "#fff" }}
            />
            <YAxis 
              label={{ value: "Caffeine (mg)", angle: -90, position: "insideLeft", fill: "#fff" }}
              tick={{ fill: "#fff" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={400} 
              label={{ value: "Recommended Daily Limit", fill: "#ff4444", fontSize: 12 }}
              stroke="#ff4444" 
              strokeDasharray="3 3"
            />
            <Line 
              type="monotone" 
              dataKey="caffeine" 
              stroke="#ff7300"
              strokeWidth={3}
              dot={{ fill: "#ff7300", r: 4 }}
              activeDot={{ r: 8, fill: "#ffa500" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CaffeineGraph;
