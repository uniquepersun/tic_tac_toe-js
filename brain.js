const board = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (boardState[index] !== '' || !gameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`yayyy ${currentPlayer} has won!`);
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== '')) {
        alert('uh ohh that\'s a tie!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    board.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
}

board.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
