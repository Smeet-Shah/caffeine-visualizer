import React, { useState } from "react";
import CaffeineGraph from "./components/CaffeineGraph";
import CaffeineStatus from "./components/CaffeineStatus";

const HALF_LIFE_HOURS = 5;
const COMMON_DRINKS = {
  "Coffee (8 oz | 237 mL)": 95,
  "Espresso (1 oz | 30 mL)": 63,
  "Bang Energy (16 oz | 473 mL)": 300,
  "Celsius Energy Drink (12 oz | 355 mL)": 200,
  "Monster Energy (16 oz | 473 mL)": 160,
  "Red Bull (8.4 oz | 250 mL)": 80,
  "5-Hour Energy (1.93 oz | 57 mL)": 200,
  "Coca-Cola (12 oz | 355 mL)": 34,
};

const App = () => {
  const [caffeineIntake, setCaffeineIntake] = useState([]);
  const [mg, setMg] = useState("");
  const [time, setTime] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");

  const generateGraphData = () => {
    let data = [];
    for (let hour = 0; hour <= 24; hour += 0.5) {
      let totalCaffeine = 0;
      caffeineIntake.forEach(({ amount, startTime }) => {
        let elapsed = hour - startTime;
        if (elapsed >= 0) {
          totalCaffeine += amount * Math.pow(0.5, elapsed / HALF_LIFE_HOURS);
        }
      });
      data.push({ time: hour, caffeine: Math.round(totalCaffeine) });
    }
    return data;
  };

  const handleAddDose = () => {
    if (mg && time) {
      setCaffeineIntake([...caffeineIntake, { 
        amount: parseFloat(mg), 
        startTime: parseFloat(time),
        timestamp: new Date().getTime()
      }]);
      setMg("");
      setTime("");
      setSelectedDrink("");
    }
  };

  const handleSelectDrink = (drink) => {
    setMg(COMMON_DRINKS[drink]);
    setSelectedDrink(drink);
  };

  const handleReset = () => {
    setCaffeineIntake([]);
    setMg("");
    setTime("");
    setSelectedDrink("");
  };

  const totalCaffeine = caffeineIntake.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
          ☕ Caffeine Half-Life Visualizer
        </h1>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Add Caffeine Intake</h2>
              <div className="mb-8">
                <h3 className="text-lg mb-2 text-gray-300">Quick Select:</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(COMMON_DRINKS).map(([drink, amount]) => (
                    <button
                      key={drink}
                      onClick={() => handleSelectDrink(drink)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        selectedDrink === drink 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {drink}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Caffeine (mg)"
                  value={mg}
                  onChange={(e) => setMg(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                />
                <input
                  type="number"
                  placeholder="Time taken (hours ago)"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleAddDose}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105"
                  >
                    Add Dose
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
              <div className="space-y-4">
                <CaffeineStatus 
                  currentCaffeine={generateGraphData()[0]?.caffeine || 0} 
                />
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">Total Caffeine Intake</p>
                  <p className="text-3xl font-bold text-orange-400">{totalCaffeine} mg</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">Number of Doses</p>
                  <p className="text-3xl font-bold text-orange-400">{caffeineIntake.length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-300">Recommended Daily Limit</p>
                  <p className="text-3xl font-bold text-orange-400">400 mg</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
            <CaffeineGraph data={generateGraphData()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
