import { ChessPiece, ChessSquare } from 'lib/chess/ChessInterface';
import { RefObject } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';

export type ChessboardParams = {
  board: ChessSquare[][];
  onPieceDragStop?: (
    e: DraggableEvent,
    data: DraggableData,
    chessPiece: ChessPiece,
    boardRef: RefObject<HTMLDivElement>
  ) => void | false;
};
