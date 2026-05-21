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

import { LinkedList } from "./linkedList.js";

const BOARD_SIZE = 8;

class BoardPos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.parent = null;
        this.visited = false;
    }

    combine(p2) {
        return { x: this.x + p2.x, y: this.y + p2.y };
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

            this.board.push(row);
        }
    }

    findShortestPath(p1, p2) {
        this.#clearVisted();
        this.#clearParents();

        if(!this.#isValidPos(p1) || !this.#isValidPos(p2)) return undefined;

        let moveQ = new LinkedList();

        //Make sure we visit it so that it's not included in future move sets
        this.board[p1.x][p1.y].visited = true;

        moveQ.push(this.board[p1.x][p1.y]);

        while(!moveQ.empty()) {
            let curr = moveQ.pop();

            if(curr.x === p2.x && curr.y === p2.y) {
                console.log("Path Found!");

                let shortestPath = [];

                let pathNode = curr;

                while(pathNode.parent !== null) {
                    shortestPath.push(pathNode);

                    pathNode = pathNode.parent;
                }

                shortestPath.push(pathNode); //Push the starting point also

                this.#setPathAsVisited(shortestPath);

                return shortestPath.reverse();
            }
           
            let moveSet = this.#generateKnightMoveSet(curr);

            for(let i = 0; i < moveSet.length; i++) {
                this.board[moveSet[i].x][moveSet[i].y].parent = curr;
                this.board[moveSet[i].x][moveSet[i].y].visited = true;
                let newMove = this.board[moveSet[i].x][moveSet[i].y];
                moveQ.push(newMove);
            }
        }

        /*
        UNWIND:
            Start at the correct move; grab it's parent, push to array, 
            set current as next; repeat until parent is null
        */
    }

    #isValidPos(pos) {
        return pos.x >= 0 &&
               pos.x < BOARD_SIZE &&
               pos.y >= 0 && 
               pos.y < BOARD_SIZE;
    }

    #generateKnightMoveSet(currPos) {
        let moveSet = [
            {x: -1, y: -2},
            {x: 1, y: -2},
            {x: 2, y: -1},
            {x: 2, y: 1},
            {x: 1, y: 2},
            {x: -1, y: 2},
            {x: -2, y: 1},
            {x: -2, y: -1}
        ]

        let possibleMoves = [];

        for(let i = 0; i < 8; i++) {
            let move = currPos.combine(moveSet[i]);

            if(this.#isValidPos(move) && this.board[move.x][move.y].visited === false) {
                possibleMoves.push(move);
            }
        }

        return possibleMoves;
    }

    prettyPrint() {
        let boardString = "";

        let columnLabel = " ";

        for(let i = 0; i < BOARD_SIZE; i++) {
            columnLabel += `  ${i} `;
        }

        boardString += columnLabel + "\n";

        for(let y = 0; y < BOARD_SIZE; y++) {

            for(let x = 0; x  < BOARD_SIZE; x++) {
                if(x === 0) {
                    boardString += `${y} `;
                }

                let symbol = this.board[x][y].visited ? "V" : " ";

                boardString += `[${symbol}] `;
            }

            boardString += "\n";
        }

        console.log(boardString);
    }

    #setPathAsVisited(shortestPath) {
        this.#clearVisted();

        for(let i = 0; i < shortestPath.length; i++) {
            let pathNode = shortestPath[i];
            
            this.board[pathNode.x][pathNode.y].visited = true;
        }
    }

    #clearVisted() {
        for(let y = 0; y < BOARD_SIZE; y++) {
            for(let x = 0; x < BOARD_SIZE; x++) {
                this.board[x][y].visited = false;
            }
        }
    }

    #clearParents() {
        for(let y = 0; y < BOARD_SIZE; y++) {
            for(let x = 0; x < BOARD_SIZE; x++) {
                this.board[x][y].parent = null;
            }
        }
    }
}

let chessBoard = new Board();

let path = chessBoard.findShortestPath({x: 0, y:0}, {x: 2, y: 2});

for(let i = 0; i < path.length; i++) {
    console.log(`Move ${i}: (${path[i].x}, ${path[i].y})`);
}

chessBoard.prettyPrint();