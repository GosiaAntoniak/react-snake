import React from "react";
import "./Snake.css";

const snake = props => {
    return (
        <div>
            {props.snakeDots.map((dot, i) => {
                const styleSnake = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`
                };
                return <div className="snake-dot" key={i} style={styleSnake}></div>;
            })}
        </div>
    );
};
export default snake;
