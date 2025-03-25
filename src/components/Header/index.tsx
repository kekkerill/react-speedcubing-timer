import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Arrowicon from "../icons/Arrowicon/index.tsx";
import useSolveStore from "../store/store.ts";
import React from "react";

const Header = () => {
  const clearSolves = useSolveStore((state) => state.clearSolves);

  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.to_main}>
          <Arrowicon color="#fff" width="30px" height="30px" />
        </div>
      </Link>
      <div className={styles.logo_block}>
        <div className={styles.logo}>R.S.C.T.</div>
        <div className={styles.logo_underline}>React Speed Cube Timer</div>
      </div>
      <div onClick={clearSolves} className={styles.clear_session}>
        Clear session
      </div>
    </div>
  );
};

export default Header;
