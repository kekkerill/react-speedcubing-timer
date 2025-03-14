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
  const [showPlusTwo, setShowPlusTwo] = useState(false);
  const [showDNF, setShowDNF] = useState(false);
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
      if (showPlusTwo) finalTimeWithPenalties += TWO_SEC;
      if (showDNF) finalTimeWithPenalties = "DNF"; // Do Not Finished;

      setFinalTime(finalTimeWithPenalties);
      saveToLocalStorage(
        finalTimeWithPenalties,
        scramble,
        showPlusTwo,
        showDNF
      );
      onGenerateScramble();
    }

    if (prevIsRunningRef.current === false && isRunning) {
      setFinalTime(null);
      setShowPlusTwo(false);
      setShowDNF(false);
    }
    prevIsRunningRef.current = isRunning;
  }, [isRunning, onGenerateScramble, time, showPlusTwo, showDNF, scramble]);

  useEffect(() => {
    if (!isRunning && finalTime !== null) {
      let finalTimeWithPenalties = time;
      if (showPlusTwo) finalTimeWithPenalties += TWO_SEC;
      if (showDNF) finalTimeWithPenalties = "DNF"; // Do Not Finished;
      setFinalTime(finalTimeWithPenalties);
      updateSolveInLocalStorage(showPlusTwo, showDNF);
    }
  }, [showPlusTwo, showDNF, isRunning, time, finalTime]);

  const handlePlusTwo = () => {
    setShowPlusTwo((prev) => !prev);
    if (!showPlusTwo) setShowDNF(false);
  };

  const handleDNF = () => {
    setShowDNF((prev) => !prev);
    if (!showDNF) setShowPlusTwo(false);
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
  //TODO: кнопки штрафов доделать
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
          ? `${formatTime(finalTime)} ${showPlusTwo ? "(+2)" : ""}`
          : formatTime(time)}
      </div>

      <div className={styles.actions}>
        <button
          className={
            showPlusTwo ? styles.action_btn__active : styles.action_btn
          }
          onClick={handlePlusTwo}
          disabled={isRunning}
        >
          +2
        </button>
        <button
          className={showDNF ? styles.action_btn__active : styles.action_btn}
          onClick={handleDNF}
          disabled={isRunning}
        >
          DNF
        </button>
      </div>
    </div>
  );
};

export default TimerBlock;
