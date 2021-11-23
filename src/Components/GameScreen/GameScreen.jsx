import React, { useEffect, useState } from 'react'
import '../../App.css'
import {gameSubject, initGame, resetGame} from '../../Game'
import Board from '../Board/Board'
import styles from  './GameScreen.module.css'

function GameScreen() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  useEffect(() => {

    const queryString = window.location.search;    
    const urlParams = new URLSearchParams(queryString);
    let level = urlParams.get('level');
    level = parseInt(level);

    console.log('level ',level)

    initGame(level)
    const subscribe = gameSubject.subscribe((game) =>{
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
    })

    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className={styles.container}>
      {isGameOver && (
        <h2 className={styles.vertical_text}>  GAME OVER  
          <button onClick={resetGame}>
            <span className={styles.vertical_text}>NEW GAME</span>
          </button>
        </h2>
      )}
      <div className={styles.board_container}>
        <Board board={board} />
      </div>
      {result && <p  className={styles.vertical_text}>{result}</p>}
    </div>
  )
}

export default GameScreen;
