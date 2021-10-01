import React from "react";
 import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { move } from "./Game";

export default function BoardSquare({piece, black, position}) {
    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item) => {
            const [fromPosition] = item.id.split('_')
            move(fromPosition, position)
            console.log(item)
        },
    })
    
    return (
        <div className="board-square" ref={drop}>
            <Square black={black}>
                {piece && <Piece piece={piece} black={false} position={position} />}
            </Square>
        </div>
    )
}