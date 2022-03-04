import React from "react";
import classes from "./Spinner.module.css"

export default function Spinner ({text}) {
    return (
        <div className={classes.container}>
            <div className={classes.chess_icon}></div>
            <p className={classes.text}>{text}</p>
        </div>

    )
}