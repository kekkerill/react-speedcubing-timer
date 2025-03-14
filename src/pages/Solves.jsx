import Header from "../components/Header";
import TableBody from "../components/TableBody";

const Solves = ({ formatTime, setSolves, solves }) => {
  const thList = ["№", "Time", "Date", "Scramble", " "];
  return (
    <div className="solves">
      <Header setSolves={setSolves} />
      <ul className="th">
        {thList.map((thObj, i) => (
          <li key={i}>{thObj}</li>
        ))}
      </ul>
      <TableBody
        formatTime={formatTime}
        solves={solves}
        setSolves={setSolves}
      />
    </div>
  );
};

export default Solves;
