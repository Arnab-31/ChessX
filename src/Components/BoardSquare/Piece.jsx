import React from "react";
import {useDrag, DragPreviewImage} from 'react-dnd'
import styles from "./BoardSquare.module.css"


export default function Piece({piece: {type,color},position}) {
    
    const [{isDragging} , drag, preview] = useDrag({
        item: {
            type: 'piece',
            id: `${position}_${type}_${color}`
        },
        collect: (monitor) => {
            return {isDragging: !!monitor.isDragging()}
        }
    })
    
    const pieceImg = require(`../../assets/${type}_${color}.png`)
    return( 
        <>
        <DragPreviewImage connect={preview} src={pieceImg} />
        <div className={styles.piece_container} ref={drag} style={{opacity: isDragging ? 0 : 1}}>
            <img src={pieceImg} alt="" className={styles.piece} />
        </div>
        </>
    ) 
}