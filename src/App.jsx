import { Routes, Route } from "react-router-dom";
import "./app.scss";
import Main from "./pages/Main";
import Solves from "./pages/Solves";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [scramble, setScramble] = useState("");
  const [solves, setSolves] = useState([]);

  const formatTime = useCallback((ms) => {
    if (ms === "DNF") return "DNF";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return minutes
      ? `${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds
          .toString()
          .padStart(2, "0")}`
      : `${seconds.toString().padStart(2, "0")}:${milliseconds
          .toString()
          .padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    const loadSolves = () => {
      const storedSolves = localStorage.getItem("solves");
      if (storedSolves) {
        try {
          const parsedSolves = JSON.parse(storedSolves);
          setSolves(parsedSolves);
        } catch (error) {
          console.error("Ошибка при парсинге данных:", error);
        }
      }
    };
    loadSolves();
  }, [scramble]);
  //TODO: StateManager
  return (
    <div className="app">
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                scramble={scramble}
                setScramble={setScramble}
                formatTime={formatTime}
                solves={solves}
                setSolves={setSolves}
              />
            }
          />
          <Route
            path="/solves"
            element={
              <Solves
                solves={solves}
                setSolves={setSolves}
                formatTime={formatTime}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
