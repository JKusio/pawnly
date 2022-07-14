import { ChessPieceCallbackParams } from 'components/ChessPiece/props';
import { ChessPiece as Piece } from 'lib/chess/ChessInterface';
import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
import {
  getBoardSquare,
  getChessSquareClass,
  getPiecesFromBoard
} from 'utils/chess';
import ChessPiece from '../ChessPiece';
import HoverSquare, { BASIC_HOVER_STATE } from '../HoverSquare';
import { ChessboardProps } from './props';

const Chessboard = forwardRef(
  (
    {
      board,
      pieceBound,
      hoverState = BASIC_HOVER_STATE,
      boardOverlay,
      disabled = false,
      onPieceDragStart,
      onPieceDrag,
      onPieceDragStop
    }: ChessboardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const pieces = getPiecesFromBoard(board);

    const handlePieceDragStart = ({
      e,
      data,
      chessPiece
    }: ChessPieceCallbackParams) => {
      if (onPieceDragStart) {
        return onPieceDragStart({
          e,
          data,
          chessPiece
        });
      }
    };

    const handlePieceDrag = ({
      e,
      data,
      chessPiece
    }: ChessPieceCallbackParams) => {
      if (onPieceDrag) {
        return onPieceDrag({ e, data, chessPiece });
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
          chessPiece
        });
      }
    };

    return (
      <div
        className="w-full h-full bg-[url('https://images.chesscomfiles.com/chess-themes/boards/walnut/150.jpg')] bg-center bg-cover relative overflow-hidden"
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
                disabled={disabled}
                key={`piece-${piece.square}`}
              />
            )
        )}
        <HoverSquare
          position={hoverState.position}
          visible={hoverState.visible}
        />
        {boardOverlay?.map((row, y) =>
          row.map((square, x) => {
            const className = getChessSquareClass(getBoardSquare(x, y));
            return (
              square !== null && (
                <div
                  className={`absolute ${className} w-1/8 h-1/8 ${square} opacity-20`}
                  key={`overlay-square-${x}-${y}`}
                ></div>
              )
            );
          })
        )}
      </div>
    );
  }
);

export default Chessboard;
