import * as Chess from 'chess.js'
import './firebase';
import {BehaviorSubject} from 'rxjs'
import evaluateBoard from './EvaluateBoard'
import getBestMove from './ChessAI'
import { wait } from '@testing-library/dom'
import { db } from './firebase'
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom'


export let chess = new Chess()
let gameLevel;
let initialBoardData;
let contextVal  = null; 

export const gameSubject = new BehaviorSubject()

export async function initGame(level) {

    gameLevel = level;
    updateGame();
}



export function resetGame() {
    chess.reset();
    updateGame()
}

export function handleMove(from, to, contextValue){
    contextVal = contextValue;
    const pieceColor = chess.get(from).color;
    if(contextVal.pieceColor === "invalid" || (contextValue.isMultiplayerMode && pieceColor != contextValue.pieceColor)) return;

    const promotions = chess.moves({ verbose: true}).filter(m => m.promotion)

    if(promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)){
        const pendingPromotion = {from, to, color: promotions[0].color}
        updateGame(pendingPromotion)
    }

    const {pendingPromotion} = gameSubject.getValue() 

    if(!pendingPromotion){
        move(from, to)
    }
  
}

export function move(from, to, promotion) {
   
    let tempMove = {from, to}

    if(promotion) {
        tempMove.promotion = promotion;
    }


    const legalMove = chess.move(tempMove)
   


    if(legalMove){
    
        updateGame();

        if(gameLevel == 0)
            return;

        console.log("AI move")
        setTimeout(() =>{
            let bestMove = getBestMove(chess,gameLevel);
            chess.move(bestMove);
            console.log(bestMove)
            updateGame();
        }, 100);
        
    }

 
}  


export async function updateGame(pendingPromotion) {
  
    const isGameOver = chess.game_over()
    
    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        result: isGameOver ?  getGameResult() : null
    }
    gameSubject.next(newGame);

    if(!contextVal || !contextVal.isMultiplayerMode) return;

    const gameId = contextVal.gameId;
    const docRef = doc(db, 'games',  gameId);


    //console.log("update game: " + chess.ascii())
   

    console.log("board data ", chess.board())
    await updateDoc(docRef, {
        boardData:  chess.fen()
    });
}


export function syncGame(pendingPromotion) {
  
    const isGameOver = chess.game_over()
    
    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        result: isGameOver ?  getGameResult() : null
    }

    gameSubject.next(newGame);
    console.log("Game synced");
}

export function getGameResult() {
    if(chess.in_checkmate()) {
        const winner = chess.turn() == "w" ? 'BLACK' : 'WHITE'
        return `CHECKMATE - WINNER - ${winner}`
    }else if(chess.in_draw()){
        let reason  = '50 - MOVES - RULE'

        if(chess.in_stalemate()){
            reason = 'STALEMATE'
        } else if(chess.in_three){
            reason = 'REPETITION'
        } else if(chess.insufficient_material()){
            reason = 'INSUFFICIENT MATERIAL'
        }

        return `DRAW - ${reason}`
    }else {
        return 'UNKNOWN REASON'
    }
}