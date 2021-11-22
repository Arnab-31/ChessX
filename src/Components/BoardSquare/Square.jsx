import React from 'react'
import styles from "./BoardSquare.module.css"


export default function Square({ children, black}) {
  const bgClass = black ? styles.square_black : styles.square_white

  return (
    <div className={`${bgClass} ${styles.board_square}`}>
      {children}
    </div> 
  )
}
  