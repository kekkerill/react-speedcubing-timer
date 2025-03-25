import { Routes, Route } from "react-router-dom";
import "./app.scss";
import Main from "./pages/Main.tsx";
import Solves from "./pages/Solves.tsx";
import { useCallback, useEffect, useState } from "react";
import useSolveStore from "./components/store/store.ts";
import React from "react";

function App() {
  const [scramble, setScramble] = useState("");
  const loadSolves = useSolveStore((state) => state.loadSolves);
  const formatTime = useCallback((ms: number | "DNF") => {
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
    loadSolves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scramble]);
  //TODO: хранилище для сборок, авторизация и личные кабинет
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
              />
            }
          />
          <Route path="/solves" element={<Solves formatTime={formatTime} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
