import React from "react";
import "../Controls/Controls.css";

const Controls = props => {
    return (
        <form className="controls">
            <button className="button_left" onClick={props.left}></button>
            <button className="button_up" onClick={props.up}></button>
            <button className="button_right" onClick={props.right}></button>
            <button className="button_down" onClick={props.down}></button>
        </form>
    );
};
export default Controls;
