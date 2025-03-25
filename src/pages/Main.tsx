import { useEffect } from "react";
import MainStats from "../components/MainStats/index.tsx";
import TimerBlock from "../components/TimerBlock/index.tsx";
import LastSolves from "../components/LastSolves/index.tsx";
import CurrentStats from "../components/CurrentStats/index.tsx";
import ScrambleVisualization from "../components/ScrambleVisualization/index.tsx";
import { Scrambow } from "scrambow";
import {
  findBestTime,
  findWorstTime,
  bestAO,
  currAO,
  currMO,
} from "../utils/StatsProcessing.ts";
import useSolveStore from "../components/store/store.ts";
import React from "react";
interface MainProps {
  formatTime: (ms: number | "DNF") => string;
  scramble: string;
  setScramble: (scramble: string) => void;
}
const Main: React.FC<MainProps> = ({ formatTime, scramble, setScramble }) => {
  const solves = useSolveStore((state) => state.solves);
  const generateScramble = () => {
    setScramble(new Scrambow().get()[0].scramble_string);
  };

  useEffect(() => {
    generateScramble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const solvesCount = solves.length;
  const bestTimeValue = findBestTime(solves);
  const bestTime = bestTimeValue !== null ? formatTime(bestTimeValue) : "N/A";
  const worstTimeValue = findWorstTime(solves);
  const worstTime =
    worstTimeValue !== "no solves yet" ? formatTime(worstTimeValue) : "N/A";
  const bestAO5Value = bestAO(solves, 5);
  const bestAO5 = bestAO5Value !== undefined ? formatTime(bestAO5Value) : "N/A";
  const bestAO12Value = bestAO(solves, 12);
  const bestAO12 =
    bestAO12Value !== undefined ? formatTime(bestAO12Value) : "N/A";
  const bestAO100Value = bestAO(solves, 100);
  const bestAO100 =
    bestAO100Value !== undefined ? formatTime(bestAO100Value) : "N/A";
  const currMO3Value = currMO(solves, 3);
  const currMO3 = currMO3Value !== null ? formatTime(currMO3Value) : "N/A";
  const currAO5Value = currAO(solves, 5);
  const currAO12Value = currAO(solves, 12);
  const currAO100Value = currAO(solves, 100);
  const currAO5 = currAO5Value !== null ? formatTime(currAO5Value) : "N/A";
  const currAO12 = currAO12Value !== null ? formatTime(currAO12Value) : "N/A";
  const currAO100 =
    currAO100Value !== null ? formatTime(currAO100Value) : "N/A";

  return (
    <>
      <TimerBlock
        scramble={scramble}
        onGenerateScramble={generateScramble}
        formatTime={formatTime}
      />
      <MainStats
        solvesCount={solvesCount}
        bestTime={bestTime}
        worstTime={worstTime}
        bestAO5={bestAO5}
        bestAO12={bestAO12}
        bestAO100={bestAO100}
      />
      <ScrambleVisualization scramble={scramble} />
      <CurrentStats
        solvesCount={solvesCount}
        MO3={currMO3}
        AO5={currAO5}
        AO12={currAO12}
        AO100={currAO100}
      />
      <LastSolves formatTime={formatTime} />
    </>
  );
};

export default Main;
