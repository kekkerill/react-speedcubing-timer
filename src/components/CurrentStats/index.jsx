import React from "react";
import styles from "./CurrentStats.module.scss";
const CurrentStats = ({ solvesCount, MO3, AO5, AO12, AO100 }) => {
  const stats = {
    "MO 3": solvesCount >= 3 ? MO3 : "—",
    "AO 5": solvesCount >= 5 ? AO5 : "—",
    "AO 12": solvesCount >= 12 ? AO12 : "—",
    "AO 100": solvesCount >= 100 ? AO100 : "—",
  };

  return (
    <div className={styles.current_stats}>
      <ul>
        {Object.entries(stats).map(([label, value]) => (
          <li key={label}>
            <p>{label}</p>
            <p className={styles.dashed_underline}></p>
            <p>{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentStats;
