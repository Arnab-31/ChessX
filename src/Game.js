import * as Chess from 'chess.js'
import {BehaviorSubject} from 'rxjs'


const chess = new Chess()

export const gameSubject = new BehaviorSubject()

export function initGame() {
    updateGame();
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
        updateGame()
    }
}  


function updateGame(pendingPromotion) {
    const newGame = {
        board: chess.board(),
        pendingPromotion
    }

    gameSubject.next(newGame);
}