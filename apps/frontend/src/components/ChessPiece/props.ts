import { ChessPiece } from 'lib/chess/ChessInterface';
import { DraggableData, DraggableEvent } from 'react-draggable';

export type ChessPieceCallbackParams = {
  e: DraggableEvent;
  data: DraggableData;
  chessPiece: ChessPiece;
};

export type ChessPieceProps = {
  chessPiece: ChessPiece;
  bounds?: string | false;
  className?: string;
  onDragStart?: (data: ChessPieceCallbackParams) => void | false;
  onDrag?: (data: ChessPieceCallbackParams) => void | false;
  onDragStop?: (data: ChessPieceCallbackParams) => void | false;
};
