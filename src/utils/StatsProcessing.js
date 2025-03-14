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
export { findBestTime, findWorstTime, currAO, currMO, bestAO };
