import React from "react";

const MainStats = ({
  solvesCount,
  bestTime,
  worstTime,
  BestAO5,
  BestAO12,
  BestAO100,
}) => {
  const mainStatsObj = {
    "Solves count": solvesCount ? solvesCount : "No solves yet",
    "Best time": solvesCount > 1 ? bestTime : "—",
    "Worst time": solvesCount > 1 ? worstTime : "—",
    "Best AO5": solvesCount >= 5 ? BestAO5 : "—",
    "Best AO12": solvesCount >= 12 ? BestAO12 : "—",
    "Best AO100": solvesCount >= 100 ? BestAO100 : "—",
  };

  return (
    <div className="main-stats">
      <div className="logo-block">
        <div className="logo">R.S.C.T.</div>
        <div className="logo-underline">React Speed Cube Timer</div>
      </div>
      <div className="stats-title">Main stats</div>
      <ul>
        {Object.keys(mainStatsObj).map((statKey) => (
          <li key={statKey}>
            <p>{statKey}</p>
            <p className="dashed-underline"></p>
            <p
              className={
                statKey.includes("Best")
                  ? "best"
                  : statKey.includes("Worst")
                  ? "worst"
                  : ""
              }
            >
              {mainStatsObj[statKey]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainStats;
