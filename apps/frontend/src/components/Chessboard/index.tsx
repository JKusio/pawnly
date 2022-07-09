import { ChessPieceCallbackParams } from 'components/ChessPiece/props';
import { ChessPiece as Piece } from 'lib/chess/ChessInterface';
import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { getChessSquareClass, getPiecesFromBoard } from 'utils/chess';
import ChessPiece from '../ChessPiece';
import HoverSquare, { BASIC_HOVER_STATE } from '../HoverSquare';
import { ChessboardProps } from './props';

const Chessboard = forwardRef(
  (
    {
      board,
      pieceBound,
      onPieceDragStart,
      onPieceDrag,
      onPieceDragStop
    }: ChessboardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const pieces = getPiecesFromBoard(board);
    const [hoverState, setHoverState] = useState(BASIC_HOVER_STATE);

    const handlePieceDragStart = ({
      e,
      data,
      chessPiece
    }: ChessPieceCallbackParams) => {
      if (onPieceDragStart) {
        return onPieceDragStart({
          e,
          data,
          chessPiece,
          setHoverState
        });
      }
    };

    const handlePieceDrag = ({
      e,
      data,
      chessPiece
    }: ChessPieceCallbackParams) => {
      if (onPieceDrag) {
        return onPieceDrag({ e, data, chessPiece, setHoverState });
      }
    };

    const handlePieceDragStop = ({
      e,
      data,
      chessPiece
    }: ChessPieceCallbackParams) => {
      if (onPieceDragStop) {
        return onPieceDragStop({
          e,
          data,
          chessPiece,
          setHoverState
        });
      }
    };

    return (
      <div
        className="w-full h-full bg-[url('https://images.chesscomfiles.com/chess-themes/boards/walnut/150.jpg')] bg-center bg-cover relative"
        ref={ref}
      >
        {pieces.map(
          (piece: Piece) =>
            piece.square && (
              <ChessPiece
                chessPiece={piece}
                bounds={pieceBound}
                onDragStart={handlePieceDragStart}
                onDrag={handlePieceDrag}
                onDragStop={handlePieceDragStop}
                className={`absolute w-1/8 h-1/8 ${getChessSquareClass(
                  piece.square
                )}`}
                key={`piece-${piece.square}`}
              />
            )
        )}
        <HoverSquare
          position={hoverState.position}
          visible={hoverState.visible}
        />
      </div>
    );
  }
);

export default Chessboard;
