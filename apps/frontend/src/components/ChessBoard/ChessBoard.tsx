import { Move } from 'chess.js';
import {
  ChessInterface,
  ChessPiece as Piece,
  ChessSquare
} from 'lib/chess/ChessInterface';
import React, { useState } from 'react';
import { getBoardSquare } from 'utils/chess';
import ChessPiece from './ChessPiece';
import HoverSquare, { HoverState } from './HoverSquare';

const ChessBoardComponent = () => {
  const chessInterface = new ChessInterface();
  const [board, setBoard] = useState(chessInterface.getBoard());

  const basicHoverState: HoverState = {
    visible: 'invisible',
    position: 'board-position-00'
  };

  const [hoverState, setHoverState] = useState(basicHoverState);

  const onMove = (cords: { x: number; y: number }, piece: Piece): boolean => {
    console.log(piece);

    const { x, y } = cords;
    const to = getBoardSquare(x, y);
    const moves = chessInterface.getMoves(piece.square);
    console.log(to, moves);

    const move = moves.find((move: Move) => move.to === to);

    if (move) {
      const moveMade = chessInterface.move(move);
      if (moveMade) {
        setBoard(chessInterface.getBoard());
        return true;
      }
    }

    return false;
  };

  return (
    <div className="w-full h-full bg-[url('https://images.chesscomfiles.com/chess-themes/boards/walnut/150.jpg')] bg-center bg-cover relative">
      {board.map((row: ChessSquare[]) =>
        row.map((square: ChessSquare) => {
          if (square !== null) {
            return (
              <ChessPiece
                chessPiece={square}
                setHoverState={setHoverState}
                onMove={onMove}
                key={`piece-${square.square}`}
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
