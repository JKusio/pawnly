import { ChessInterface, ChessSquare } from 'lib/chess/ChessInterface';
import React, { useState } from 'react';
import ChessPiece from './ChessPiece';
import HoverSquare, { HoverState } from './HoverSquare';

const ChessBoardComponent = () => {
  const chessBoard = new ChessInterface();

  const basicHoverState: HoverState = {
    visible: 'invisible',
    position: 'board-position-00'
  };

  const [hoverState, setHoverState] = useState(basicHoverState);

  return (
    <div className="w-full h-full bg-[url('https://images.chesscomfiles.com/chess-themes/boards/walnut/150.jpg')] bg-center bg-cover relative">
      {chessBoard.getBoard().map((row: ChessSquare[], y: number) =>
        row.map((square: ChessSquare, x: number) => {
          if (square !== null) {
            return (
              <ChessPiece
                chessPiece={square}
                setHoverState={setHoverState}
                key={`piece-${y}-${x}`}
              />
            );
          }
        })
      )}
      <HoverSquare sharedHoverState={hoverState} />
    </div>
  );
};

export default ChessBoardComponent;
