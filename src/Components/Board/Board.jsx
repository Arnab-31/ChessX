// import React, { useEffect, useState } from "react";
// import BoardSquare from "../BoardSquare/BoardSquare";
// import styles from "./Board.module.css"

// export default function Board ({board, position = "w"}){
//     console.log(board)
//     const [curBoard, setCurrBoard] = useState([]);

    
//     useEffect(() => {
//         setCurrBoard(
//         position === 'w' ? board.flat() : board.flat().reverse()
//         )
//     }, [board, position])


//     function getXYPosition(i) {
//         const x = i%8;
//         const y = Math.abs(Math.floor(i/8) - 7)

//         return {x,y}
//     }

//     function isBlack (i) {
//         const {x,y} = getXYPosition(i);
//         return (x + y)%2 === 1 ;
//     }

//     function getPosition(i){
//         const {x,y} = getXYPosition(i);
//         const letter = ["a","b","c","d","e","f","g","h"][x]

//         return `${letter}${y+1}`
//     }

//     return <div className={styles.board}>
//         {
//             curBoard.map((piece, i) => (
//                 <div key={i} className={styles.square}>
//                     <BoardSquare 
//                         piece={piece} 
//                         black={isBlack(i)}
//                         position={getPosition(i)}/>
//                 </div>
//             ))
//         }
//     </div>
// }


import React, { useEffect, useState } from 'react'
import BoardSquare from '../BoardSquare/BoardSquare'
import styles from "./Board.module.css"
export default function Board({ board, position="w" }) {
  const [currBoard, setCurrBoard] = useState([])

  useEffect(() => {
    setCurrBoard(
      position === 'w' ? board.flat() : board.flat().reverse()
    )
  }, [board, position])

  function getXYPosition(i) {
    const x = position === 'w' ? i % 8 : Math.abs((i % 8) - 7)
    const y =
      position === 'w'
        ? Math.abs(Math.floor(i / 8) - 7)
        : Math.floor(i / 8)
    return { x, y }
  }

  function isBlack(i) {
    const { x, y } = getXYPosition(i)
    return (x + y) % 2 === 1
  }

  function getPosition(i) {
    const { x, y } = getXYPosition(i)
    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][
      x
    ]
    return `${letter}${y + 1}`
  }
  return (
    <div className={styles.board}>
      {currBoard.map((piece, i) => (
        <div key={i} className={styles.square}>
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
          />
        </div>
      ))}
    </div>
  )
}