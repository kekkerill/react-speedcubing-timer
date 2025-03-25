import React from "react";
interface ArrowiconProps {
  color?: string;
  width?: string;
  height?: string;
  rotate?: number;
}
const Arrowicon: React.FC<ArrowiconProps> = ({
  color,
  width = "20px",
  height = "20px",
  rotate = 0,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 25"
      height={width}
      width={height}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        fill={color}
        d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
        data-name="Arrow"
      />
    </svg>
  );
};

export default Arrowicon;
