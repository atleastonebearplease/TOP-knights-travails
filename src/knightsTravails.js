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

let board = [];

for(let x = 0; x < BOARD_SIZE; x++) {
    let row = [];

    for(let y = 0; y < BOARD_SIZE; y++) {
        row.push(new BoardPos(x, y));
    }

    board.push(row);
}

function prettyPrint(board) {
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

prettyPrint(board);