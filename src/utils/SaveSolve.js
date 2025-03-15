const saveToLocalStorage = (time, scramble, isPlusTwo, isDNF) => {
  const solves = JSON.parse(localStorage.getItem("solves") || "[]");
  const newSolve = {
    id: solves.length === 0 ? 1 : solves[solves.length - 1].id + 1,
    time: time,
    scramble: scramble,
    date: new Date().toLocaleDateString(),
    isPlusTwo: isPlusTwo,
    isDNF: isDNF,
    originalTime: time,
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
    if (lastSolve.isDNF) {
      lastSolve.time = "DNF";
    } else if (lastSolve.isPlusTwo) {
      lastSolve.time += 1000;
    } else {
      lastSolve.time = lastSolve.originalTime;
    }
    localStorage.setItem("solves", JSON.stringify(solves));
  }
};
export { updateSolveInLocalStorage, saveToLocalStorage };
