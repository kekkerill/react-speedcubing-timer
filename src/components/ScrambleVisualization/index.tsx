import React, { useEffect, useRef } from "react";
import { ScrambleDisplay } from "scramble-display";
import styles from "./ScrambleVisualization.module.scss";
type Visualization = "2D" | "3D";
const ScrambleVisualization = ({
  scramble,
  event = "333",
  visualization = "2D" as Visualization,
  checkered = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrambleDisplayRef = useRef<ScrambleDisplay | null>(null);

  useEffect(() => {
    scrambleDisplayRef.current = new ScrambleDisplay();

    scrambleDisplayRef.current.visualization = visualization as Visualization;
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
    if (scrambleDisplayRef.current) {
      scrambleDisplayRef.current.event = event;
      scrambleDisplayRef.current.scramble = scramble;
      scrambleDisplayRef.current.visualization = visualization;
      scrambleDisplayRef.current.checkered = checkered;
    }
  }, [scramble, event, visualization, checkered]);

  return (
    <div className={styles.scramble_visualization}>
      <div ref={containerRef}></div>
    </div>
  );
};

export default ScrambleVisualization;
