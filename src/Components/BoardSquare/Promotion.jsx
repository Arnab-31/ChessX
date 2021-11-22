import React from "react";

import Square from "./Square";
import { move } from "../../Game";
import styles from "./BoardSquare.module.css"

const promotionPieces = ['r', 'n', 'b', 'q']

export default function Promote({promotion: {from, to, color}}) {
    console.log(color + ' color')
    return   <div className={styles.board}>
        {promotionPieces.map((p,i) => (
            <div keys={i} className={styles.promote_square}>
                <Square black={i%3 === 0}>
                    <div className={styles.piece_container} onClick={()=>move(from, to, p)}>
                        <img 
                            src={require(`../../assets/${p}_${color}.png`)}
                            alt=""
                            className={styles.piece}
                        />
                    </div>
                </Square>
               
                {p}
            </div>
        ))}
        Promotion
    </div>
}