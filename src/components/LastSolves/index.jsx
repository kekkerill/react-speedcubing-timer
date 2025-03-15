import React from "react";
import { Link } from "react-router-dom";
import styles from "./LastSolves.module.scss";
import Arrowicon from "../icons/Arrowicon";

const LastSolves = ({ solves, formatTime }) => {
  const lastSolves = solves
    .slice(-3)
    .reverse()
    .map((solve) => ({
      number: solve.id,
      time: formatTime(solve.time),
    }));

  return (
    <div className={styles.last_solves}>
      <div className={styles.title}>Last solves</div>
      <ul>
        <li>
          <p className={styles.number}>№</p>
          <p className={styles.time}>Time</p>
        </li>
        {lastSolves.length > 0 ? (
          lastSolves.map(({ number, time }) => (
            <li key={number}>
              <p className={styles.number}>{number}</p>
              <p className={styles.time}>{time}</p>
            </li>
          ))
        ) : (
          <li className={styles.no_solves}>No solves yet</li>
        )}
      </ul>
      <Link to="solves">
        View all
        <Arrowicon color="#aadaff" rotate={180} width="40px" height="20px" />
      </Link>
    </div>
  );
};

export default LastSolves;
