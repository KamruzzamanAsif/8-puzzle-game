import React, { useState } from 'react';

const initialMatrix = [
  [1, 5, 3],
  [4, 2, 6],
  [7, 8, 0], // 0 represents the empty tile
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

  const handlePlay = () => {
    game = Game(initialMatrix);
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
