import React, { useState } from 'react';
import { RefreshCw, X, Circle } from 'lucide-react';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Check for winner squares by checking all winning combinations
  const checkWinner = (squares) => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null; // No winner
  };

  const handleClick = (index) => {
    if (board[index] || checkWinner(board)) return; // If cell is already filled or there's a winner

    // Update the board
    const newBoard = [...board]; 
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "It's a draw!" 
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Tic Tac Toe</h1>
        
        <div className="mb-4 text-center">
          <p className="text-xl font-semibold text-gray-700">{status}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((value, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!value || !!winner} // Disable button if cell is already filled or there's a winner
              className={`
                h-24 rounded-lg text-4xl font-bold flex items-center justify-center
                transition-all duration-200
                ${!value && !winner ? 'hover:bg-gray-100' : ''}
                ${value ? 'bg-gray-50' : 'bg-white'}
                border-2 border-gray-200
              `}
            >
              {value === 'X' && <X className="w-12 h-12 text-blue-500" />}
              {value === 'O' && <Circle className="w-12 h-12 text-red-500" />}
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-semibold
                     flex items-center justify-center gap-2 hover:bg-indigo-700 
                     transition-colors duration-200"
        >
          <RefreshCw className="w-5 h-5" />
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;