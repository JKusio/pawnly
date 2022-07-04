import { ChessBoard } from 'lib/chess/board/ChessBoard';
import React, { useState } from 'react';
import { ChessPiece } from './ChessPiece';
import HoverSquare, { HoverState } from './HoverSquare';

const ChessBoardComponent = () => {
  const chessBoard = new ChessBoard();

  const basicHoverState: HoverState = {
    visible: 'invisible',
    position: 'board-position-00'
  };

  const [hoverState, setHoverState] = useState(basicHoverState);

  return (
    <div className="w-full h-full bg-[url('https://images.chesscomfiles.com/chess-themes/boards/walnut/150.jpg')] bg-center bg-cover relative">
      {chessBoard.board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            return (
              <ChessPiece
                piece={piece.piece}
                color={piece.color}
                position={{ x, y }}
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
