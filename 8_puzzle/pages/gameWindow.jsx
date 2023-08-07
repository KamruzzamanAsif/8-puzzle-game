import React, { useState } from 'react';
import Game from '../components/game';

var initialMatrix = [
  [1, 2, 3],
  [5, 6, 0],
  [7, 8, 4], // 0 represents the empty tile
];

const shuffleMatrix = (matrix) => {
  const newMatrix = JSON.parse(JSON.stringify(matrix));
  const flatMatrix = newMatrix.flat();
  for (let i = flatMatrix.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatMatrix[i], flatMatrix[j]] = [flatMatrix[j], flatMatrix[i]];
  }
  return [
    [flatMatrix[0], flatMatrix[1], flatMatrix[2]],
    [flatMatrix[3], flatMatrix[4], flatMatrix[5]],
    [flatMatrix[6], flatMatrix[7], flatMatrix[8]],
  ];
};

const GameWindow = () => {
  const [grid, setGrid] = useState(initialMatrix);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSolved, setIsSolved] = useState(false); // Track puzzle completion


  const handleShuffle = () => {
    const shuffledMatrix = shuffleMatrix(initialMatrix);
    setGrid(shuffledMatrix);
    initialMatrix = shuffledMatrix;
    console.log(initialMatrix);
    setIsSolved(false);
  };

  const findEmptyTilePosition = (matrix) => {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {
                return { x: row, y: col }; // Return the position as an object
            }
        }
    }
    return null; // Return null if the empty tile is not found
  }

  const handlePlay = async () => {
    setIsPlaying(true);
    setIsSolved(false); // Reset the win message

    const game = new Game();
    var emptyTilePosition = findEmptyTilePosition(initialMatrix);
    const solution_matrices = game.solve(initialMatrix, emptyTilePosition.x, emptyTilePosition.y);
    console.log("Empty tile is at row:", emptyTilePosition.x);
    console.log("Empty tile is at column:", emptyTilePosition.y);
    console.log(solution_matrices);

    for (let i = 0; i < solution_matrices.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay each step by 1000ms
      setGrid(solution_matrices[i]);
    }
    setIsPlaying(false);
    setIsSolved(true); // Set win message after solving
  }

  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4">8 Puzzle Game</h1>
      <div className="max-w-xs mx-auto mb-4">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
            {row.map((value, colIndex) => (
              <div
                key={colIndex}
                className="w-12 h-12 border border-gray-400 flex items-center justify-center text-2xl"
              >
                {value !== 0 ? value : ' '}
              </div>
            ))}
          </div>
        ))}
      </div>
      {isSolved && <p className="text-green-600 font-bold">Congratulations! You've won!</p>}
      <button
        className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ${
          isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
        onClick={handleShuffle}
        disabled={isPlaying}
      >
        Shuffle
      </button>

      <button
        className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ${
          isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
        onClick={handlePlay}
        disabled={isPlaying}
      >
        Play
      </button>
    </div>
  );
};

export default GameWindow;
