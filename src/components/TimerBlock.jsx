import React, { useState, useEffect, useRef } from "react";

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
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  useEffect(() => {
    if (prevIsRunningRef.current === true && !isRunning) {
      let finalTimeWithPenalties = time;
      if (showPlusTwo) finalTimeWithPenalties += 2000;
      if (showDNF) finalTimeWithPenalties = "DNF";

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
      if (showPlusTwo) finalTimeWithPenalties += 2000;
      if (showDNF) finalTimeWithPenalties = "DNF";
      setFinalTime(finalTimeWithPenalties);
      updateSolveInLocalStorage(showPlusTwo, showDNF);
    }
  }, [showPlusTwo, showDNF, isRunning, time, finalTime]);

  const saveToLocalStorage = (time, scramble, isPlusTwo, isDNF) => {
    const solves = JSON.parse(localStorage.getItem("solves") || "[]");
    const newSolve = {
      id: solves.length + 1,
      time: time,
      scramble: scramble,
      date: new Date().toLocaleDateString(),
      isPlusTwo: isPlusTwo,
      isDNF: isDNF,
    };
    solves.push(newSolve);
    localStorage.setItem("solves", JSON.stringify(solves));
  };

  const updateSolveInLocalStorage = (isPlusTwo, isDNF) => {
    const solves = JSON.parse(localStorage.getItem("solves")) || [];
    if (solves.length > 0) {
      const lastSolve = solves[solves.length - 1];

      lastSolve.isPlusTwo = isPlusTwo;
      lastSolve.isDNF = isDNF;

      if (isDNF) {
        lastSolve.time = "DNF";
      } else if (isPlusTwo) {
        if (typeof lastSolve.time === "number") {
          lastSolve.time += 1000;
        } else {
          console.error("lastSolve.time is not a number:", lastSolve.time);
        }
      }

      localStorage.setItem("solves", JSON.stringify(solves));
    }
  };

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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, isKeyDown]);

  return (
    <div className="timer-block">
      <div className="scramble-block">
        <div className="scramble">{scramble}</div>
        <button onClick={onGenerateScramble}>
          <svg
            fill="#fff"
            height="20px"
            width="20px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 489.645 489.645"
            space="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3 c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8 c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2 C414.856,432.511,548.256,314.811,460.656,132.911z"></path>{" "}
              </g>
            </g>
          </svg>
        </button>
      </div>
      <div className="start-hint">press SpaceBar to start</div>
      <div className={`timer${isKeyDown && !isRunning ? "__green" : ""}`}>
        {finalTime === "DNF"
          ? "DNF"
          : finalTime !== null
          ? `${formatTime(finalTime)} ${showPlusTwo ? "(+2)" : ""}`
          : formatTime(time)}
      </div>

      <div className="actions">
        <button
          className={`action-btn${showPlusTwo ? "__active" : ""}`}
          onClick={handlePlusTwo}
          disabled={isRunning}
        >
          +2
        </button>
        <button
          className={`action-btn${showDNF ? "__active" : ""}`}
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
