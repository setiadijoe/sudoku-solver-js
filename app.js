let solveSudoku = (board) => {
    if (solve(board)) {
        return board;
    } else {
        return "No solution exists.";
    }
}

let solve = (board) => {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        return true; // Sudoku solved
    }
  
    const [row, col] = emptyCell;
  
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
  
            if (solve(board)) {
                return true;
            }
  
            // Backtrack if the current placement leads to no solution
            board[row][col] = 0;
        }
    }
  
    return false;
}

let findEmptyCell = (board) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

let isValid = (board, row, col, num) => {
    // Check if the number already exists in the current row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }
    // Check if the number already exists in the current column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }

    // Check if the number already exists in the current 3x3 box
    const boxStartRow = Math.floor(row / 3) * 3;
    const boxStartCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxStartRow + i][boxStartCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

// Example board (0 represents empty cells)

const board = [
    [9, 1, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 7, 0, 1, 3, 0, 0, 8],
    [6, 0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 7, 3, 4],
    [0, 0, 0, 5, 0, 0, 0, 1, 0],
    [3, 4, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 9, 0, 6],
    [0, 0, 0, 8, 0, 0, 0, 7, 0],
]
  
let printBoard = (board) => {
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0 && i !== 0) {
            console.log("---------------------");
        }
        let row = "";
        for (let j = 0; j < 9; j++) {
            if (j % 3 === 0 && j !== 0) {
                row += "| ";
            }
            row += board[i][j] + " ";
        }
        console.log(row);
    }
}

console.log("Sudoku board:");
printBoard(board);
  
console.log("\nSolving Sudoku...");
const solution = solveSudoku(board);
  
console.log("\nSudoku solution:");
printBoard(solution);