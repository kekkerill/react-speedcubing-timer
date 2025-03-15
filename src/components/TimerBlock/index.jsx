import React, { useState, useEffect, useRef } from "react";
import styles from "./TimerBlock.module.scss";
import {
  saveToLocalStorage,
  updateSolveInLocalStorage,
} from "../../utils/SaveSolve";
import Reloadicon from "../icons/Reloadicon";
const TWO_SEC = 2000;
const TIMER_SHIFT = 10;
const TimerBlock = ({ scramble, onGenerateScramble, formatTime }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [plusTwo, setPlusTwo] = useState(false);
  const [DNF, setDNF] = useState(false);
  const [finalTime, setFinalTime] = useState(null);
  const startTimeRef = useRef(0);
  const prevIsRunningRef = useRef();

  useEffect(() => {
    let timer;
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      timer = setInterval(() => {
        const currentTime = Date.now() - startTimeRef.current;
        setTime(currentTime);
      }, TIMER_SHIFT);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, isKeyDown]);

  useEffect(() => {
    if (prevIsRunningRef.current === true && !isRunning) {
      let finalTimeWithPenalties = time;
      if (plusTwo) finalTimeWithPenalties += TWO_SEC;
      if (DNF) finalTimeWithPenalties = "DNF"; // Do Not Finished;

      setFinalTime(finalTimeWithPenalties);
      saveToLocalStorage(finalTimeWithPenalties, scramble, plusTwo, DNF);
      onGenerateScramble();
    }

    if (prevIsRunningRef.current === false && isRunning) {
      setFinalTime(null);
      setPlusTwo(false);
      setDNF(false);
    }
    prevIsRunningRef.current = isRunning;
  }, [isRunning, onGenerateScramble, time, plusTwo, DNF, scramble]);

  useEffect(() => {
    if (!isRunning && finalTime !== null) {
      let finalTimeWithPenalties = time;
      if (plusTwo) finalTimeWithPenalties += TWO_SEC;
      if (DNF) finalTimeWithPenalties = "DNF"; // Do Not Finished;
      setFinalTime(finalTimeWithPenalties);
      updateSolveInLocalStorage(plusTwo, DNF);
      onGenerateScramble();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plusTwo, DNF, finalTime]);

  const handlePlusTwo = () => {
    setPlusTwo((prev) => !prev);
    if (!plusTwo) setDNF(false);
  };

  const handleDNF = () => {
    setDNF((prev) => !prev);
    if (!DNF) setPlusTwo(false);
  };

  const handleKeyDown = (event) => {
    if (event.code === "Space" && !isKeyDown) {
      setIsKeyDown(true);
      if (!isRunning) {
        setTime(0);
      }
    }
  };

  const handleKeyUp = (event) => {
    if (event.code === "Space") {
      setIsKeyDown(false);
      setIsRunning((prev) => !prev);
    }
  };
  return (
    <div className={styles.timer_block}>
      <div className={styles.scramble_block}>
        <div className={styles.scramble}>{scramble}</div>
        <button onClick={onGenerateScramble}>
          <Reloadicon />
        </button>
      </div>
      <div className={styles.start_hint}>press SpaceBar to start</div>
      <div
        className={isKeyDown && !isRunning ? styles.timer__green : styles.timer}
      >
        {finalTime === "DNF"
          ? "DNF"
          : finalTime !== null
          ? `${formatTime(finalTime)} ${plusTwo ? "(+2)" : ""}`
          : formatTime(time)}
      </div>

      <div className={styles.actions}>
        <button
          className={plusTwo ? styles.action_btn__active : styles.action_btn}
          onClick={handlePlusTwo}
          disabled={time === 0 || isRunning}
        >
          +2
        </button>
        <button
          className={DNF ? styles.action_btn__active : styles.action_btn}
          onClick={handleDNF}
          disabled={time === 0 || isRunning}
        >
          DNF
        </button>
      </div>
    </div>
  );
};

export default TimerBlock;
