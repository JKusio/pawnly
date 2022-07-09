import { ChessPiece } from 'lib/chess/ChessInterface';
import { DraggableData, DraggableEvent } from 'react-draggable';

export type ChessPieceProps = {
  chessPiece: ChessPiece;
  bounds?: string | false;
  className?: string;
  onDragStart?: (
    e: DraggableEvent,
    data: DraggableData,
    chessPiece: ChessPiece
  ) => void | false;
  onDrag?: (
    e: DraggableEvent,
    data: DraggableData,
    chessPiece: ChessPiece
  ) => void | false;
  onDragStop?: (
    e: DraggableEvent,
    data: DraggableData,
    chessPiece: ChessPiece
  ) => void | false;
};
