/* 
Create an array of arrays of a position object. The object should have x, y, and visited properties. 

Starting at the first position, queue all possible moves.
    Make sure that we filter for both outside the board moves and already visited nodes (if we've visited, then the moves are already done there)
    Check to see if we've landed in the right spot
    if not, 
    pop each new move and queue up all possible moves from that location
    But how to keep up with previous positions?

    Okay, so instead we remove visited from the position object. We instead have a parent. It can hold who it's previous move was
    Once we find the correct position, we then can unwind by going up the parent chain until we hit root (whose parent is null);
    We instead keep visited nodes in a set (a hash map with no values basically) by storing each visited position as a string `pos.x, pos.y`
    Refer to Codex stuff
*/

const BOARD_SIZE = 8;

class BoardPos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.parent = null;
    }
}

class Board { 
    constructor() {
        this.board = [];

        //Initialize
        for(let x = 0; x < BOARD_SIZE; x++) {
            let row = [];

            for(let y = 0; y < BOARD_SIZE; y++) {
                row.push(new BoardPos(x, y));
            }

            board.push(row);
        }
    }

    findShortestPath(pos1, pos2) {

        

        /* 
            We need linked list for queue
            Iniitalize move queue
            if pos1 is valid
                push it onto the queue
            else
                return undefined;

            while queue is not empty
                if(pos === pos2)
                    We have found our path, unwind and create array of positions
                    return the array
                
                Otherwise, continue. 
                Go through each posssible move and validate
                    Set the current pos as parent
                    push it onto the queue


        UNWIND:
            Start at the correct move; grab it's parent, push to array, 
            set current as next; repeat until parent is null
        */
    }

    prettyPrint() {
        let boardString = "";

        let columnLabel = " ";

        for(let i = 0; i < BOARD_SIZE; i++) {
            columnLabel += `  ${i} `;
        }

        boardString += columnLabel + "\n";

        for(let x = 0; x < BOARD_SIZE; x++) {

            for(let y = 0; y < BOARD_SIZE; y++) {
                if(y === 0) {
                    boardString += `${x} `;
                }

                let symbol = board[x][y].parent ? "V" : " ";

                boardString += `[${symbol}] `;
            }

            boardString += "\n";
        }

        console.log(boardString);
    }
}

let chessBoard = new Board();

chessBoard.prettyPrint();



/* 
    So I think we should make a board class
    It can contain the board, have the function to find the path, and can contain the print
    function. Not sure if it needs anything else. Will have to add as I go. 
*/