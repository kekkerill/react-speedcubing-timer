import React from "react";
import Header from "../components/Header/index.tsx";
import TableBody from "../components/TableBody/index.tsx";

const Solves = ({ formatTime }) => {
  const thList = ["№", "Time", "Date", "Scramble", " "];
  return (
    <div className="solves">
      <Header />
      <ul className="th">
        {thList.map((thObj, i) => (
          <li key={i}>{thObj}</li>
        ))}
      </ul>
      <TableBody formatTime={formatTime} />
    </div>
  );
};

export default Solves;
