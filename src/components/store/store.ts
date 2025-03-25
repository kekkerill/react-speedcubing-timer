import { create } from "zustand";

interface Solve {
  id: number;
  time: number | "DNF";
  scramble: string;
  date: string;
  isPlusTwo: boolean;
  isDNF: boolean;
  originalTime: number;
}

interface SolveStore {
  solves: Solve[];
  saveSolve: (
    time: number,
    scramble: string,
    isPlusTwo: boolean,
    isDNF: boolean
  ) => void;
  updateLastSolve: (isPlusTwo: boolean, isDNF: boolean) => void;
  loadSolves: () => void;
  clearSolves: () => void;
  deleteSolve: (id: number) => void;
}

const useSolveStore = create<SolveStore>((set, get) => ({
  solves: [],
  saveSolve: (time, scramble, isPlusTwo, isDNF) => {
    const solves = get().solves;
    const newSolve: Solve = {
      id: solves.length === 0 ? 1 : solves[solves.length - 1].id + 1,
      time,
      scramble,
      date: new Date().toLocaleDateString(),
      isPlusTwo,
      isDNF,
      originalTime: time,
    };
    const updatedSolves = [...solves, newSolve];
    set({ solves: updatedSolves });
    localStorage.setItem("solves", JSON.stringify(updatedSolves));
  },
  updateLastSolve: (isPlusTwo, isDNF) => {
    const solves = get().solves;
    if (solves.length > 0) {
      const lastSolve = { ...solves[solves.length - 1] };

      lastSolve.isPlusTwo = isPlusTwo;
      lastSolve.isDNF = isDNF;
      if (lastSolve.isDNF) {
        lastSolve.time = "DNF";
      } else if (lastSolve.isPlusTwo) {
        lastSolve.time = lastSolve.originalTime + 2000;
      } else {
        lastSolve.time = lastSolve.originalTime;
      }

      const updatedSolves = [...solves.slice(0, -1), lastSolve];
      set({ solves: updatedSolves });
      localStorage.setItem("solves", JSON.stringify(updatedSolves));
    }
  },
  loadSolves: () => {
    const storedSolves = localStorage.getItem("solves");
    if (storedSolves) {
      try {
        const parsedSolves: Solve[] = JSON.parse(storedSolves);
        set({ solves: parsedSolves });
      } catch (error) {
        console.error("Ошибка при парсинге данных:", error);
      }
    }
  },
  clearSolves: () => {
    set({ solves: [] });
    localStorage.removeItem("solves");
  },
  deleteSolve: (id) => {
    const updatedSolves = get().solves.filter((solve) => solve.id !== id);
    set({ solves: updatedSolves });
    localStorage.setItem("solves", JSON.stringify(updatedSolves));
  },
}));

export default useSolveStore;
