import { useEffect } from "react";
import MainStats from "../components/MainStats";
import TimerBlock from "../components/TimerBlock";
import LastSolves from "../components/LastSolves";
import CurrentStats from "../components/CurrentStats";
import ScrambleVisualization from "../components/ScrambleVisualization";
import { Scrambow } from "scrambow";
import {
  findBestTime,
  findWorstTime,
  bestAO,
  currAO,
  currMO,
} from "../utils/StatsProcessing";
const Main = ({ formatTime, scramble, setScramble, setSolves, solves }) => {
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
  const bestAO5 = formatTime(bestAO(solves, 5));
  const bestAO12 = formatTime(bestAO(solves, 12));
  const bestAO100 = formatTime(bestAO(solves, 100));
  const currMO3 = formatTime(currMO(solves, 3));
  const currAO5 = formatTime(currAO(solves, 5));
  const currAO12 = formatTime(currAO(solves, 12));
  const currAO100 = formatTime(currAO(solves, 100));

  return (
    <>
      <TimerBlock
        solves={solves}
        setSolves={setSolves}
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
      <LastSolves solves={solves} formatTime={formatTime} />
    </>
  );
};

export default Main;
