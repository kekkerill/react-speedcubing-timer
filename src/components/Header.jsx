import { Link } from "react-router-dom";

const Header = ({ setSolves }) => {
  const handleClear = () => {
    setSolves([]);
    localStorage.removeItem("solves");
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="to-main">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
              fill="#fff"
              height="20px"
              width="20px"
              d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
              data-name="Left"
            />
          </svg>
        </div>
      </Link>
      <div className="logo-block">
        <div className="logo">R.S.C.T.</div>
        <div className="logo-underline">React Speed Cube Timer</div>
      </div>
      <div onClick={handleClear} className="clear-session">
        Clear session
      </div>
    </div>
  );
};

export default Header;
