import React, {useEffect, useState, useContext} from "react";
import context from "../../Context/context";
import Square from "./Square";
import Piece from "./Piece";
import { useDrop } from "react-dnd";
import { handleMove } from "../../Game";
import { gameSubject } from "../../Game";
import Promote from "./Promotion";
import styles from "./BoardSquare.module.css"



export default function BoardSquare({piece, black, position}) {

    const [promotion, setPromotion] = useState(null)
    const contextValue = useContext(context);

    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item) => {
            const [fromPosition] = item.id.split('_')
            handleMove(fromPosition, position, contextValue)
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
        <div className={styles.board_square} ref={drop}>
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