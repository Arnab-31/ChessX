import evaluateBoard from "./EvaluateBoard";


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


const getBestMove = function (game) {
    const depth = 3;
    var bestMove = minimaxRoot(depth, game, true);
    return bestMove;
};


export default getBestMove;