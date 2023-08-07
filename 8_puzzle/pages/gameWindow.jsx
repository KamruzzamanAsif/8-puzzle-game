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

  const handleShuffle = () => {
    const shuffledMatrix = shuffleMatrix(initialMatrix);
    setGrid(shuffledMatrix);
    initialMatrix = shuffledMatrix;
  };

  function findEmptyTilePosition(matrix) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {
                return { x: row, y: col }; // Return the position as an object
            }
        }
    }
    return null; // Return null if the empty tile is not found
  }

  const handlePlay = () => {
    const game = new Game(initialMatrix);
    var emptyTilePosition = findEmptyTilePosition(initialMatrix);
    const solution_matrices = game.solve(initialMatrix, emptyTilePosition.x, emptyTilePosition.y);
    console.log("Empty tile is at row:", emptyTilePosition.x);
    console.log("Empty tile is at column:", emptyTilePosition.y);
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
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onClick={handleShuffle}
      >
        Shuffle
      </button>

      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onClick={handlePlay}
      >
        Play
      </button>
    </div>
  );
};

export default GameWindow;
