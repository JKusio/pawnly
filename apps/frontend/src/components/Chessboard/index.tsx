import { ChessPiece as Piece, ChessSquare } from 'lib/chess/ChessInterface';
import React, { createRef, useEffect, useState } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';
import ChessPiece from '../ChessPiece';
import HoverSquare, { HoverState } from '../HoverSquare/HoverSquare';
import { ChessboardParams } from './props';

const ChessboardComponent = ({ board, onPieceDragStop }: ChessboardParams) => {
  useEffect(() => {
    console.log('Chessboard created');
  });

  const boardRef = createRef<HTMLDivElement>();

  const basicHoverState: HoverState = {
    visible: 'invisible',
    position: 'board-position-00'
  };

  const [hoverState, setHoverState] = useState(basicHoverState);

  const handlePieceDragStop = (
    e: DraggableEvent,
    data: DraggableData,
    chessPiece: Piece
  ) => {
    if (onPieceDragStop) {
      onPieceDragStop(e, data, chessPiece, boardRef);
    }
  };

  // const onMove = useCallback(
  //   (cords: { x: number; y: number }, piece: Piece) => {
  //     const { x, y } = cords;
  //     const to = getBoardSquare(x, y);
  //     const moves = chessInterface.getMoves(piece.square);

  //     const move = moves.find((move: Move) => move.to === to);

  //     if (move) {
  //       chessInterface.move(move);

  //       const updatedBoard = chessInterface.getBoard();

  //       setBoard((oldBoard: ChessSquare[][]) =>
  //         oldBoard.map((row: ChessSquare[], x: number) =>
  //           row.map((square: ChessSquare, y: number) =>
  //             square?.color !== updatedBoard[x][y]?.color
  //               ? updatedBoard[x][y]
  //               : square
  //           )
  //         )
  //       );

  //       return true;
  //     }

  //     return false;
  //   },
  //   []
  // );

  // const onDrag = useCallback(
  //   (position: string, visible: 'visible' | 'invisible') => {
  //     setHoverState((oldState: HoverState) => {
  //       if (oldState.position === position && oldState.visible === visible) {
  //         return oldState;
  //       }

  //       return {
  //         position,
  //         visible
  //       };
  //     });
  //   },
  //   [hoverState]
  // );

  return (
    <div
      className="w-full h-full bg-[url('https://images.chesscomfiles.com/chess-themes/boards/walnut/150.jpg')] bg-center bg-cover relative"
      ref={boardRef}
    >
      {board.map((row: ChessSquare[]) =>
        row.map((square: ChessSquare) => {
          if (square !== null) {
            return (
              <ChessPiece
                chessPiece={square}
                key={`piece-${square.square}`}
                onDragStop={handlePieceDragStop}
              />
            );
          }
        })
      )}
      <HoverSquare
        position={hoverState.position}
        visible={hoverState.visible}
      />
    </div>
  );
};

export default ChessboardComponent;
