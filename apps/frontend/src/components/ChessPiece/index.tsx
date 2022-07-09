import { PieceType } from 'chess.js';
import { PieceColor } from 'lib/chess/ChessInterface';
import React from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { ChessPieceProps } from './props';

const PIECE_MAP = {
  ['w']: {
    ['p']: "bg-[url('/assets/chess/pieces/Chess_plt60.png')]",
    ['n']: "bg-[url('/assets/chess/pieces/Chess_nlt60.png')]",
    ['b']: "bg-[url('/assets/chess/pieces/Chess_blt60.png')]",
    ['r']: "bg-[url('/assets/chess/pieces/Chess_rlt60.png')]",
    ['q']: "bg-[url('/assets/chess/pieces/Chess_qlt60.png')]",
    ['k']: "bg-[url('/assets/chess/pieces/Chess_klt60.png')]"
  },
  ['b']: {
    ['p']: "bg-[url('/assets/chess/pieces/Chess_pdt60.png')]",
    ['n']: "bg-[url('/assets/chess/pieces/Chess_ndt60.png')]",
    ['b']: "bg-[url('/assets/chess/pieces/Chess_bdt60.png')]",
    ['r']: "bg-[url('/assets/chess/pieces/Chess_rdt60.png')]",
    ['q']: "bg-[url('/assets/chess/pieces/Chess_qdt60.png')]",
    ['k']: "bg-[url('/assets/chess/pieces/Chess_kdt60.png')]"
  }
};

const mapPieceToImage = (type: PieceType, color: PieceColor): string => {
  return PIECE_MAP[color][type];
};

const ChessPiece = ({
  chessPiece,
  bounds = 'parent',
  className,
  onDragStart,
  onDrag,
  onDragStop
}: ChessPieceProps) => {
  const background = mapPieceToImage(chessPiece.type, chessPiece.color);

  const draggableRef = React.useRef<Draggable>(null);

  const handleGrabStart = (
    e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    if (draggableRef.current) {
      const middle = data.node.offsetWidth / 2;
      draggableRef.current.setState({
        ...draggableRef.current.state,
        x: -middle + (e as React.MouseEvent).nativeEvent.offsetX,
        y: -middle + (e as React.MouseEvent).nativeEvent.offsetY
      });
    }

    if (onDragStart) {
      onDragStart({ e, data, chessPiece });
    }
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData): void | false => {
    if (onDrag) {
      onDrag({ e, data, chessPiece });
    }
  };

  const handleGrabStop = (
    e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    if (onDragStop) {
      if (onDragStop({ e, data, chessPiece }) === false) {
        return false;
      }
    }

    if (draggableRef.current) {
      draggableRef.current.setState({
        ...draggableRef.current.state,
        x: 0,
        y: 0
      });
    }
  };

  return (
    <Draggable
      onStart={handleGrabStart}
      onDrag={handleDrag}
      onStop={handleGrabStop}
      bounds={bounds}
      ref={draggableRef}
      defaultClassName="z-10 cursor-grab"
      defaultClassNameDragging="z-20 cursor-grabbing"
    >
      <div
        className={`${className} ${background} bg-cover caret-transparent`}
      ></div>
    </Draggable>
  );
};

export default ChessPiece;
