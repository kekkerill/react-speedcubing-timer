type Solve = {
  time: number | "DNF";
};

function currMO(solves: Solve[], amount: number): number | "DNF" | null {
  if (solves.length < amount) {
    return null;
  }
  const times = solves.slice(-amount).map((obj) => obj.time);

  if (times.includes("DNF")) {
    return "DNF";
  }

  const sum = times.reduce(
    (acc: number, time) => acc + (typeof time === "number" ? time : 0),
    0
  );
  return sum / amount;
}

function currAO(solves: Solve[], amount: number): number | "DNF" | null {
  if (solves.length < amount) {
    return null;
  }
  let times = solves.slice(-amount).map((obj) => obj.time);

  if (times.includes("DNF")) {
    return "DNF";
  }

  times = times.filter((time): time is number => typeof time === "number");
  times.sort();
  const aoTimes = times.slice(1, -1);
  const sum = aoTimes.reduce(
    (acc: number, time) => acc + (typeof time === "number" ? time : 0),
    0
  );
  return sum / (amount - 2);
}

function findBestTime(solves: Solve[]): number | null {
  const validSolves = solves.filter((solve) => solve.time !== "DNF");
  if (validSolves.length === 0) {
    return null;
  }
  return Math.min(...validSolves.map((solve) => solve.time as number));
}

function bestAO(solves: Solve[], solvesAmount: number): number | undefined {
  if (solves.length < solvesAmount) {
    return undefined;
  }
  let bestAO = Infinity;

  for (let i = 0; i <= solves.length - solvesAmount; i++) {
    let times = solves.slice(i, i + solvesAmount).map((obj) => obj.time);

    times = times.filter((time): time is number => typeof time === "number");

    if (times.length < solvesAmount - 2) {
      continue;
    }

    times.sort();
    times = times.slice(1, -1);
    const sum = times.reduce(
      (acc: number, time) => acc + (typeof time === "number" ? time : 0),
      0
    );
    const avg = sum / (solvesAmount - 2);
    bestAO = Math.min(bestAO, avg);
  }

  return bestAO === Infinity ? undefined : bestAO;
}

function findWorstTime(solves: Solve[]): number | "no solves yet" {
  const validSolves = solves.filter((solve) => solve.time !== "DNF");
  if (validSolves.length === 0) {
    return "no solves yet";
  }
  return Math.max(...validSolves.map((solve) => solve.time as number));
}

export { findBestTime, findWorstTime, currAO, currMO, bestAO };
