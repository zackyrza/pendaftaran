import React from "react";
import Styles from "./Home.module.scss";

import { IHomeProps } from "./Home.d";
import { useNavigate } from "react-router-dom";

function Home({}: IHomeProps) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/masuk");
  };

  return (
    <div className={Styles["wrapper"]}>
      <div className={Styles["button"]} onClick={handleOnClick}>
        <p>Pendaftaran</p>
      </div>
    </div>
  );
}

export default Home;
