import React from "react";
import Crossicon from "../icons/Crossicon/index.tsx";
import useSolveStore from "../store/store.ts";
import styles from "./TableBody.module.scss";
const TableBody = ({ formatTime }) => {
  const solves = useSolveStore((state) => state.solves);
  const deleteSolve = useSolveStore((state) => state.deleteSolve);
  return (
    <div className={styles.table_body}>
      {solves.length === 0 ? (
        <div className={styles.no_solves}>No solves yet</div>
      ) : (
        solves.map((solve) => (
          <ul key={solve.id} className={styles.table_item}>
            <li>{solve.id}</li>
            <li>
              {solve.isDNF ? (
                `DNF (${formatTime(solve.originalTime)})`
              ) : (
                <>
                  {formatTime(solve.time)} {solve.isPlusTwo ? "(+2)" : ""}
                </>
              )}
            </li>
            <li>{solve.date}</li>
            <li>{solve.scramble}</li>
            <li
              onClick={() => {
                deleteSolve(solve.id);
              }}
            >
              <Crossicon />
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default TableBody;
