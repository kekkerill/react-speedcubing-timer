import React from "react";
import { Link } from "react-router-dom";

const LastSolves = ({ solves, formatTime }) => {
  const lastSolves = solves
    .slice(-3)
    .reverse()
    .map((solve) => ({
      number: solve.id,
      time: formatTime(solve.time),
    }));

  return (
    <div className="last-solves">
      <div className="title">Last solves</div>
      <ul>
        <li>
          <p className="number">№</p>
          <p className="time">Time</p>
        </li>
        {lastSolves.length > 0 ? (
          lastSolves.map(({ number, time }) => (
            <li key={number}>
              <p className="number">{number}</p>
              <p className="time">{time}</p>
            </li>
          ))
        ) : (
          <li className="no-solves">No solves yet</li>
        )}
      </ul>
      <Link to="solves">View all →</Link>
    </div>
  );
};

export default LastSolves;
