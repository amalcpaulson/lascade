import React from "react";
import { Map } from "../map";
import styles from "./index.module.css";

type Props = {};

export const Home: React.FC<Props> = (_props) => {
  return (
    <div className={styles.Wrapper}>
      <Map startLat={57} startLong={-5} endLat={67} endLong={-5} />
    </div>
  );
};
