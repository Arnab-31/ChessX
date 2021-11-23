import * as Chess from 'chess.js'
import {BehaviorSubject} from 'rxjs'
import evaluateBoard from './EvaluateBoard'
import getBestMove from './ChessAI'
import { wait } from '@testing-library/dom'


export const chess = new Chess()
let gameLevel;

export const gameSubject = new BehaviorSubject()

export function initGame(level) {
    gameLevel = level;
    updateGame();
}



export function resetGame() {
    chess.reset();
    updateGame()
}

export function handleMove(from, to){
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
        
        // const moves = chess.moves()
        // let move;
        // let value = 99999;

        // moves.forEach(m => {
        //     chess.move(m)
        //     if(evaluateBoard(chess.board()) < value){
        //         value = evaluateBoard(chess.board());
        //         move = m;
        //     }

        //     chess.undo()
        // });

        // chess.move(move)
       
        updateGame();
        console.log("AI move")
        setTimeout(() =>{
            let bestMove = getBestMove(chess,gameLevel);
            chess.move(bestMove);
            console.log(bestMove)
            updateGame();
        }, 100);
        
    }

 
}  


function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over()
    
    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        result: isGameOver ?  getGameResult() : null
    }
    console.log("update game: " + chess.ascii())
    gameSubject.next(newGame);
}

function getGameResult() {
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