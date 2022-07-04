import { Color } from 'lib/chess/pieces/Color';
import { Piece } from 'lib/chess/pieces/Piece';
import React from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { HoverState } from './HoverSquare';

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
  position,
  setHoverState
}: {
  piece: Piece;
  color: Color;
  position: { x: number; y: number };
  setHoverState: any;
}) => {
  const background = mapPieceToImage(piece, color);
  const { x, y } = position;
  const piecePositionClassName = `board-position-${y}${x}`;

  const draggableRef = React.useRef<Draggable>(null);

  const handleGrabStart = (
    e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    if (draggableRef.current) {
      const middle = data.node.offsetWidth / 2;
      draggableRef.current.setState({
        x: -middle + (e as React.MouseEvent).nativeEvent.offsetX,
        y: -middle + (e as React.MouseEvent).nativeEvent.offsetY
      });
    }
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData): void | false => {
    const middle = data.node.offsetWidth / 2;
    const squareSize = (data.node.parentElement?.clientWidth || 0) / 8;
    const offsetLeft = data.node.offsetLeft;
    const offsetTop = data.node.offsetTop;

    const x = Math.floor((offsetLeft + data.x + middle) / squareSize);
    const y = 7 - Math.floor((offsetTop + data.y + middle) / squareSize);

    setHoverState({ visible: 'visible', position: `board-position-${y}${x}` });
  };

  const handleGrabStop = (
    e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    if (draggableRef.current) {
      draggableRef.current.setState({ x: 0, y: 0 });
    }

    setHoverState({ visible: 'invisible', position: 'board-position-00' });
  };

  return (
    <Draggable
      onStart={handleGrabStart}
      onDrag={handleDrag}
      onStop={handleGrabStop}
      bounds="parent"
      ref={draggableRef}
      defaultClassName="z-10 cursor-grab"
      defaultClassNameDragging="z-10 cursor-grabbing"
    >
      <div
        className={`absolute w-1/8 h-1/8 ${piecePositionClassName} ${background} bg-cover caret-transparent`}
      ></div>
    </Draggable>
  );
};
