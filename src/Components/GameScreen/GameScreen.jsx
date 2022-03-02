import React, { useEffect, useState, useContext } from 'react'
import "../../firebase";
import '../../App.css'
import Bars from 'react-bars';
import {gameSubject, initGame, resetGame} from '../../Game'
import Board from '../Board/Board'
import styles from  './GameScreen.module.css'
import {chess} from '../../Game'
import evaluateBoard from '../../EvaluateBoard';
import { useParams } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { syncGame } from '../../Game';
import Context from '../../Context/context'




function GameScreen() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [evalData, setEvalData] = useState(0);
  const [update, setUpdate] = useState("");
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const contextValue = useContext(Context);
  const [username, setUsername] = useState("");
  const [oppUsername, setOppUsername] = useState("Waiting for player");

  const updateGameData = async () => {
    setLoading(true);

    setTimeout(async function(){
      const { currentUser } = auth
    const docRef = doc(db, 'games',  id);
    const document = await getDoc(docRef);

    const newGameData = {...document.data()};
    const opponentData = newGameData.game.members[0];
    setOppUsername(opponentData.name);

    const startingPiece = opponentData.piece === "w" ? "b" : "w";
    const newPlayer = {
      uid: currentUser.uid,
      piece: startingPiece,
      name: contextValue.username, 
      creator: false,
    }
    newGameData.game.members.push(newPlayer);
    newGameData.game.status = "started";

    await updateDoc(docRef, {
      boardData: newGameData.boardData,
      game: newGameData.game
    });

    contextValue.setMultiplayerMode(true);
    contextValue.setGameId(id);
    contextValue.setPieceColor(startingPiece);

    setLoading(false);
    },3000)

  }
  
  

  useEffect(() => {

    const queryString = window.location.search;    
    const urlParams = new URLSearchParams(queryString);
    let level = urlParams.get('level');
   
    level = level ? parseInt(level) : 0;

    if(level === 0){
      if(!contextValue.isMultiplayerMode){
       updateGameData();
      }
    }
    if(id) contextValue.setGameId(id)

    
    initGame(level, null);    
    const subscribe = gameSubject.subscribe((game) =>{
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setEvalData(evaluateBoard(chess))

    })

    if(id){
      console.log("context gameId ", contextValue.gameId);
      console.log("context pieceColor", contextValue.pieceColor);
      console.log("context username", contextValue.username);
      const docRef = doc(db, 'games',  id);
      onSnapshot(docRef,  (doc) => {
        console.log("snapshot called")
        console.log(doc.data());
        chess.load(doc.data().boardData);
        console.log("Game synced");
        console.log(doc.data())
        setBoard(chess.board())
        if(doc.data().game.members.length == 2){
          const name1 = doc.data().game.members[0].name;
          const name2 = doc.data().game.members[1].name;
          if(contextValue.username === name1)
            setOppUsername(name2);
          else
            setOppUsername(name1);
        }
      })
    }

    return () => subscribe.unsubscribe()
  }, [username,oppUsername])

  return (

    <div className={styles.container}>
      {contextValue.isMultiplayerMode &&
       <div>
      <p style={{color: 'white'}}>{oppUsername}</p><br />
      <p style={{color: 'white'}}>{contextValue.username}</p>
       </div>}
    
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
