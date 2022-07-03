import { Color } from 'lib/chess/pieces/Color';
import { Piece } from 'lib/chess/pieces/Piece';
import React, { useState } from 'react';
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
  DraggableProps
} from 'react-draggable';

const PIECE_MAP = {
  [Color.White]: {
    [Piece.Pawn]: "bg-[url('/assets/chess/pieces/Chess_plt60.png')]",
    [Piece.Knight]: "bg-[url('/assets/chess/pieces/Chess_nlt60.png')]",
    [Piece.Bishop]: "bg-[url('/assets/chess/pieces/Chess_blt60.png')]",
    [Piece.Rook]: "bg-[url('/assets/chess/pieces/Chess_rlt60.png')]",
    [Piece.Queen]: "bg-[url('/assets/chess/pieces/Chess_qlt60.png')]",
    [Piece.King]: "bg-[url('/assets/chess/pieces/Chess_klt60.png')]"
  },
  [Color.Black]: {
    [Piece.Pawn]: "bg-[url('/assets/chess/pieces/Chess_pdt60.png')]",
    [Piece.Knight]: "bg-[url('/assets/chess/pieces/Chess_ndt60.png')]",
    [Piece.Bishop]: "bg-[url('/assets/chess/pieces/Chess_bdt60.png')]",
    [Piece.Rook]: "bg-[url('/assets/chess/pieces/Chess_rdt60.png')]",
    [Piece.Queen]: "bg-[url('/assets/chess/pieces/Chess_qdt60.png')]",
    [Piece.King]: "bg-[url('/assets/chess/pieces/Chess_kdt60.png')]"
  }
};

const mapPieceToImage = (piece: Piece, color: Color): string => {
  return PIECE_MAP[color][piece];
};

export const ChessPiece = ({
  piece,
  color,
  position
}: {
  piece: Piece;
  color: Color;
  position: { x: number; y: number };
}) => {
  const background = mapPieceToImage(piece, color);
  const { x, y } = position;
  const piecePositionClassName = `chess-piece-${y}${x}`;

  let [cursor, setCursor] = useState('cursor-grab');

  const handleGrabStart = (
    e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    setCursor('cursor-grabbing');
  };

  const handleGrabStop = (
    e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    setCursor('cursor-grab');
  };

  return (
    <Draggable
      onStart={handleGrabStart}
      onStop={handleGrabStop}
      bounds="parent"
    >
      <div
        className={`absolute w-1/8 h-1/8 ${piecePositionClassName} ${background} bg-cover ${cursor} caret-transparent`}
      ></div>
    </Draggable>
  );
};
