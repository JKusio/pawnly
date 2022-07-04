import { PieceType } from 'chess.js';
import { ChessPiece, PieceColor } from 'lib/chess/ChessInterface';
import React from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { getBoardSquare } from 'utils/chess';

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

const ChessPieceComponent = ({
  chessPiece,
  setHoverState
}: {
  chessPiece: ChessPiece;
  setHoverState: any;
}) => {
  console.log(chessPiece);

  const background = mapPieceToImage(chessPiece.type, chessPiece.color);
  const piecePositionClassName = `board-position-${chessPiece.square}`;

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

    const x = 7 - Math.floor((offsetLeft + data.x + middle) / squareSize);
    const y = 7 - Math.floor((offsetTop + data.y + middle) / squareSize);

    setHoverState({
      visible: 'visible',
      position: `board-position-${getBoardSquare(x, y)}`
    });
  };

  const handleGrabStop = (
    e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    if (draggableRef.current) {
      draggableRef.current.setState({ x: 0, y: 0 });
    }

    setHoverState({ visible: 'invisible', position: `board-position-a1` });
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

export default ChessPieceComponent;
