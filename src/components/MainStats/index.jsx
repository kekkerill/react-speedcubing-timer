import React from "react";
import styles from "./MainStats.module.scss";
const MainStats = ({
  solvesCount,
  bestTime,
  worstTime,
  bestAO5,
  bestAO12,
  bestAO100,
}) => {
  const mainStatsObj = {
    "Solves count": solvesCount ? solvesCount : "No solves yet",
    "Best time": solvesCount > 1 ? bestTime : "—",
    "Worst time": solvesCount > 1 ? worstTime : "—",
    "Best AO5": solvesCount >= 5 ? bestAO5 : "—",
    "Best AO12": solvesCount >= 12 ? bestAO12 : "—",
    "Best AO100": solvesCount >= 100 ? bestAO100 : "—",
  };

  return (
    <div className={styles.main_stats}>
      <div className={styles.logo_block}>
        <div className={styles.logo}>R.S.C.T.</div>
        <div className={styles.logo_underline}>React Speed Cube Timer</div>
      </div>
      <div className={styles.stats_title}>Main stats</div>
      <ul>
        {Object.keys(mainStatsObj).map((statKey) => (
          <li key={statKey}>
            <p>{statKey}</p>
            <p className={styles.dashed_underline}></p>
            <p
              className={
                statKey.includes("Best")
                  ? styles.best
                  : statKey.includes("Worst")
                  ? styles.worst
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
