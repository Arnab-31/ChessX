import React from "react";

import Square from "./Square";
import { move } from "./Game";

const promotionPieces = ['r', 'n', 'b', 'q']

export default function Promote({promotion: {from, to, color}}) {
    console.log(color + ' color')
    return   <div className="board">
        {promotionPieces.map((p,i) => (
            <div keys={i} className="promote-square">
                <Square black={i%3 === 0}>
                    <div className="piece-container" onClick={()=>move(from, to, p)}>
                        <img 
                            src={require(`./assets/${p}_${color}.png`)}
                            alt=""
                            className="piece" 
                        />
                    </div>
                </Square>
               
                {p}
            </div>
        ))}
        Promotion
    </div>
}