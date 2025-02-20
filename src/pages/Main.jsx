import { useEffect } from "react";
import MainStats from "../components/MainStats";
import TimerBlock from "../components/TimerBlock";
import LastSolves from "../components/LastSolves";
import CurrentStats from "../components/CurrentStats";
import ScrambleVisualization from "../components/ScrambleVisualization";
import { Scrambow } from "scrambow";

const Main = ({ formatTime, scramble, setScramble, setSolves, solves }) => {
  function currMO(solves, amount) {
    if (solves.length < amount) {
      return null;
    }
    let times = solves.slice(-amount).map((obj) => obj.time);

    if (times.includes("DNF")) {
      return "DNF";
    }

    const sum = times.reduce((acc, time) => acc + time, 0);
    return sum / amount;
  }

  function currAO(solves, amount) {
    if (solves.length < amount) {
      return null;
    }
    let times = solves.slice(-amount).map((obj) => obj.time);

    if (times.includes("DNF")) {
      return "DNF";
    }

    times.sort((a, b) => a - b);
    let aoTimes = times.slice(1, -1);
    const sum = aoTimes.reduce((acc, time) => acc + time, 0);
    return sum / (amount - 2);
  }

  function findBestTime(solves) {
    solves = solves.filter((solve) => solve.time !== "DNF");
    if (solves.length === 0) {
      return null;
    }
    let bestTime = solves[0].time;
    for (let i = 1; i < solves.length; i++) {
      if (solves[i].time < bestTime) {
        bestTime = solves[i].time;
      }
    }
    return bestTime;
  }

  function bestAO(solves, solvesAmount) {
    if (solves.length < solvesAmount) {
      return undefined;
    }
    let bestAO = Infinity;

    for (let i = 0; i <= solves.length - solvesAmount; i++) {
      let times = solves.slice(i, i + solvesAmount).map((obj) => obj.time);

      times = times.filter((time) => time !== "DNF");

      if (times.length < solvesAmount - 2) {
        continue;
      }

      times.sort((a, b) => a - b);
      times = times.slice(1, -1);
      let sum = times.reduce((acc, time) => acc + time, 0);
      let avg = sum / (solvesAmount - 2);
      bestAO = Math.min(bestAO, avg);
    }

    return bestAO === Infinity ? undefined : bestAO;
  }
  function findWorstTime(solves) {
    solves = solves.filter((solve) => solve.time !== "DNF");
    if (solves.length === 0) {
      return "no solves yet";
    }
    let worstTime = solves[0].time;
    for (let i = 1; i < solves.length; i++) {
      if (solves[i].time > worstTime) {
        worstTime = solves[i].time;
      }
    }
    return worstTime;
  }

  const generateScramble = () => {
    setScramble(new Scrambow().get()[0].scramble_string);
  };

  useEffect(() => {
    generateScramble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const solvesCount = solves.length;
  const bestTime = formatTime(findBestTime(solves));
  const worstTime = formatTime(findWorstTime(solves));
  const BestAO5 = formatTime(bestAO(solves, 5));
  const BestAO12 = formatTime(bestAO(solves, 12));
  const BestAO100 = formatTime(bestAO(solves, 100));
  const currMO3 = formatTime(currMO(solves, 3));
  const currAO5 = formatTime(currAO(solves, 5));
  const currAO12 = formatTime(currAO(solves, 12));
  const currAO100 = formatTime(currAO(solves, 100));

  return (
    <>
      <MainStats
        solvesCount={solvesCount}
        bestTime={bestTime}
        worstTime={worstTime}
        BestAO5={BestAO5}
        BestAO12={BestAO12}
        BestAO100={BestAO100}
      />
      <TimerBlock
        solves={solves}
        setSolves={setSolves}
        scramble={scramble}
        onGenerateScramble={generateScramble}
        formatTime={formatTime}
      />
      <LastSolves solves={solves} formatTime={formatTime} />
      <div className="timer-underline">
        <CurrentStats
          solvesCount={solvesCount}
          MO3={currMO3}
          AO5={currAO5}
          AO12={currAO12}
          AO100={currAO100}
        />
        <ScrambleVisualization scramble={scramble} />
      </div>
    </>
  );
};

export default Main;
