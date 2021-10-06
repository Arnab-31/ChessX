import React, {useEffect, useState} from "react";
 import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { handleMove } from "./Game";
import { gameSubject } from "./Game";
import Promote from "./Promotion";

export default function BoardSquare({piece, black, position}) {

    const [promotion, setPromotion] = useState(null)
    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item) => {
            const [fromPosition] = item.id.split('_')
            handleMove(fromPosition, position)
            console.log(item)
        },
    })

    useEffect(() => {
        const subscribe = gameSubject.subscribe(({pendingPromotion}) => {
            pendingPromotion && pendingPromotion.to == position 
                ?  setPromotion(pendingPromotion) 
                : setPromotion(null)
        })
    })
    
    return (
        <div className="board-square" ref={drop}>
            <Square black={black}>
                {promotion 
                    ? <Promote promotion={promotion} /> 
                    : piece 
                    ? <Piece piece={piece} black={false} position={position} /> 
                    : null
                }  
            </Square>
        </div>
    )
}