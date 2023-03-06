import React from "react";
import "../Score/Score.css";

const Score = props => {
    let value = props.score;
    return <p className="score">Score: {value - 2}</p>;
};
export default Score;
