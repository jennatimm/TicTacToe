// Tic Tac Toe
class Agent {
    constructor() {
    }

    minimax(board, isMaximizing) {
        // Base cases - check if the game is over or a draw by checking values in board
        switch (board.gameOver()) {
            case 3:
                return 0;   // DRAW
            case 2:
                return -1;  // O WINS
            case 1:
                return 1;   // X WINS
            case 0:

            // Set up enviroment depending on if maximizing or not
            var bestScore = (isMaximizing) ? -Infinity: Infinity;
            var stayInRange = (isMaximizing) ? function(a, b) {return Math.max(a, b)}:
                                               function(a, b) {return Math.min(a, b)};

            // Recursive case - evaluate all possible moves and choose the best score
            for (var selectedSpot = 1; selectedSpot <= board.cells.length; selectedSpot++) {
                // if cell is free make a clone and test move
                if (board.cellFree(selectedSpot)) {
                    var newBoard = board.clone();
                    newBoard.move(selectedSpot);
                    var score = this.minimax(newBoard, !isMaximizing);
                    bestScore = stayInRange(bestScore, score);
                }
            }
            return bestScore;
        }
    }


    // accepts a clone of the board
    selectMove(board) {
        //set score limit and move
        var scoreLimit = board.playerOne ? -Infinity : Infinity;
        var theMove = null;

        // Loop through each spot to evaluate the best move
        for (var selectedSpot = 1; selectedSpot <= board.cells.length; selectedSpot++) {
            // if cell is free make a clone and test move
            if (board.cellFree(selectedSpot)) {
                var newBoard = board.clone();
                newBoard.move(selectedSpot);
                var score = this.minimax(newBoard, !board.playerOne);

                // Update the best move if the current move has a better score
                var scoreIsBetter = (board.playerOne) ? score > scoreLimit: score < scoreLimit;
                if (scoreIsBetter) {
                    scoreLimit = score;
                    theMove = selectedSpot;
                }
            }
        }
        return theMove;
    }
}