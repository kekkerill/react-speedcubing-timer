const saveToLocalStorage = (time, scramble, isPlusTwo, isDNF) => {
  const solves = JSON.parse(localStorage.getItem("solves") || "[]");
  const newSolve = {
    id: solves.length === 0 ? 1 : solves[solves.length - 1].id + 1,
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
      lastSolve.time = "DNF"; // Do Not Finished;;
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
export { updateSolveInLocalStorage, saveToLocalStorage };
