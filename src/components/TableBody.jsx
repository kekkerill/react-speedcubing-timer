const TableBody = ({ formatTime, solves }) => {
  return (
    <div className="table-body">
      {solves.length === 0 ? (
        <div className="no-solves">No solves yet</div>
      ) : (
        solves.reverse().map((solve) => (
          <ul key={solve.id} className="table-item">
            <li>{solve.id}</li>
            <li>
              {solve.isDNF ? (
                `DNF (${formatTime(solve.time)})`
              ) : (
                <>
                  {formatTime(solve.time)} {solve.isPlusTwo ? "+2" : ""}
                </>
              )}
            </li>
            <li>{solve.date}</li>
            <li>{solve.scramble}</li>
          </ul>
        ))
      )}
    </div>
  );
};

export default TableBody;
