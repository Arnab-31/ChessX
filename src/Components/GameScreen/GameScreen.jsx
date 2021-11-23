import React, { useEffect, useState } from 'react'
import '../../App.css'
import Bars from 'react-bars';
import {gameSubject, initGame, resetGame} from '../../Game'
import Board from '../Board/Board'
import styles from  './GameScreen.module.css'
import {chess} from '../../Game'
import evaluateBoard from '../../EvaluateBoard';




function GameScreen() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [evalData, setEvalData] = useState(0);
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
      setEvalData(evaluateBoard(chess))

      console.log('Evaldata ', evalData)
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
      <div className={styles.evalBar}>
        <div className={styles.progress1} style={{height: `${300 - (evalData * 300)/290}px`}}></div>
        <div className={styles.progress2} style={{height: `${300 + (evalData * 300)/290}px`}}></div>
      </div>
      
      <div className={styles.board_container}>
        <Board board={board} />
      </div>
      {result && <p  className={styles.vertical_text}>{result}</p>}
    </div>
  )
}

export default GameScreen;
