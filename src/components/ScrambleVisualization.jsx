import React, { useEffect, useRef } from "react";
import { ScrambleDisplay } from "scramble-display"; // Импортируем ScrambleDisplay из библиотеки

const ScrambleVisualization = ({
  scramble,
  event = "333",
  visualization = "2D",
  checkered = false,
}) => {
  const containerRef = useRef(null);
  const scrambleDisplayRef = useRef(null);

  useEffect(() => {
    scrambleDisplayRef.current = new ScrambleDisplay();

    scrambleDisplayRef.current.event = event;
    scrambleDisplayRef.current.scramble = scramble;
    scrambleDisplayRef.current.visualization = visualization;
    scrambleDisplayRef.current.checkered = checkered;

    if (containerRef.current) {
      containerRef.current.appendChild(scrambleDisplayRef.current);
    }

    return () => {
      if (scrambleDisplayRef.current && containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeChild(scrambleDisplayRef.current);
      }
    };
  }, [checkered, event, scramble, visualization]);

  useEffect(() => {
    // Обновляем свойства при изменении пропсов
    if (scrambleDisplayRef.current) {
      scrambleDisplayRef.current.event = event;
      scrambleDisplayRef.current.scramble = scramble;
      scrambleDisplayRef.current.visualization = visualization;
      scrambleDisplayRef.current.checkered = checkered;
    }
  }, [scramble, event, visualization, checkered]);

  return (
    <div className="scramble-visualization">
      <div ref={containerRef}></div>
    </div>
  );
};

export default ScrambleVisualization;
