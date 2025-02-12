# ☕ Caffeine Half-Life Visualizer  
I used to drink a lot of caffiene before exams during school and I wanted to know how hard it will hit me later on. Everything online wasn't easy to understand so I made this so now I can see how screwed I am after taking 2 Redbulls at 3AM and how hard it's going to hit me at 4PM. Simple tool and easy to use.

![image](https://github.com/user-attachments/assets/2e83ca3a-429d-4d08-b802-c9ca955121aa)


## Features  
- Enter caffeine dosage and time of consumption  
- See caffeine decay over 24 hours using half-life calculations  
- Add multiple doses to track cumulative effects  
- Interactive graph using Recharts  
- Dark mode UI for better readability  

## Tech Stack  
- **Frontend:** React (Vite)  
- **Graphs:** Recharts  
- **Styling:** Tailwind CSS  
- **State Management:** React Hooks  

## How It Works  
Caffeine follows an **exponential decay model**:  

$$ C_t = C_0 \times (0.5)^{(t / 5)} $$  

- **C₀** = Initial caffeine dose (mg)  
- **t** = Time elapsed (hours)  
- **Half-life = ~5 hours**  

## Setup & Installation  
1. Clone the repo:  
   ```bash
   git clone https://github.com/Smeet-Shah/caffeine-visualizer.git
   cd caffeine-visualizer

2. Install dependencies:  
   ```bash
    npm install

3. Start the project:
   ```bash
    npm run dev

### The app will run at http://localhost:5173.

  
### Contributing
Pull requests are welcome. Open an issue for feature requests or improvements.


