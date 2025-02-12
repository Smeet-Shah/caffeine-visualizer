import React from "react";

const CaffeineStatus = ({ currentCaffeine }) => {
  const getStatus = () => {
    if (currentCaffeine >= 400) {
      return {
        emoji: "🤪",
        status: "Overcaffeinated!",
        description: "You might want to slow down on the caffeine",
        color: "text-red-500"
      };
    } else if (currentCaffeine >= 200) {
      return {
        emoji: "⚡",
        status: "Wide Awake",
        description: "Peak productivity mode activated",
        color: "text-green-400"
      };
    } else if (currentCaffeine >= 100) {
      return {
        emoji: "😊",
        status: "Alert",
        description: "Nice and focused",
        color: "text-blue-400"
      };
    } else if (currentCaffeine > 0) {
      return {
        emoji: "😌",
        status: "Mild",
        description: "Just a gentle boost",
        color: "text-yellow-400"
      };
    } else {
      return {
        emoji: "😴",
        status: "No Caffeine",
        description: "Time for a caffeine break?",
        color: "text-gray-400"
      };
    }
  };

  const status = getStatus();

  return (
    <div className="bg-gray-700 p-4 rounded-lg text-center">
      <div className="text-4xl mb-2">{status.emoji}</div>
      <h3 className={`text-xl font-bold ${status.color}`}>{status.status}</h3>
      <p className="text-gray-300 text-sm">{status.description}</p>
    </div>
  );
};

export default CaffeineStatus;
