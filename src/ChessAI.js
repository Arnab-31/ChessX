import { identity } from "rxjs";
import evaluateBoard from "./EvaluateBoard";

let allowQuiesce = false;

const minimaxRoot =function(depth, game, isMaximisingPlayer) {

    var newGameMoves = game.moves();
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i];
        game.move(newGameMove);
        var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

const minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
  
    if (depth === 0) {
      
        if(allowQuiesce)
            return -Quiesce(game, alpha, beta, true, 2)
        else   
            return -evaluateBoard(game);
    }

    var newGameMoves = game.moves( { verbose: true } );

    for ( let move of newGameMoves ) {
    move.importance = 0
        + move.flags.includes( 'p' ) ? 16 : 0
        + move.flags.includes( 'c' ) ? 8 : 0;   
    }

    newGameMoves.sort( ( a, b ) => b.importance - a.importance );

    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        } 
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

const Quiesce = function(game, alpha, beta, isBlack, depth){
    var evaluation;

    if(!isBlack)
        evaluation = -evaluateBoard(game);
    else   
        evaluation =  evaluateBoard(game);

    if(depth == 0)
        return evaluation;

    if(evaluation >= beta)
        return beta;

    if(alpha < evaluation)
        alpha = evaluation;

    var newGameMoves = game.moves( { verbose: true } );
    var captureMoves = []

    captureMoves = newGameMoves.filter(move => move.flags.includes( 'c' ));

 
    for (var i = 0; i < captureMoves.length; i++) {
        
        //console.log("Quiesce ", captureMoves[i])
        game.move(captureMoves[i]);

        let score = -Quiesce(game, -beta, -alpha, !isBlack, depth -1);
        game.undo();

        if(score >= beta)
            return beta;

        if(score > alpha)
            alpha = score;
    }

    return alpha;
   
}


const getBestMove = function (game,level) {
    let depth = 3;


    if(level === 1){
        depth = 2;
    }else if(level === 2){
        depth = 3;
    }else if(level === 3){
        depth = 3;
        allowQuiesce = true;
    }else if(level === 4){
        depth =  4;
    }

    console.log("AI depth", depth, " ",level)
   
    var bestMove = minimaxRoot(depth, game, true);
    return bestMove;
};


export default getBestMove;