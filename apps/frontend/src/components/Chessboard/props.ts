import { HoverState } from 'components/HoverSquare';
import { ChessPiece, ChessSquare } from 'lib/chess/ChessInterface';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';

export type ChessboardProps = {
  board: ChessSquare[][];
  onPieceDragStart?: (data: ChessboardCallbackParams) => void | false;
  onPieceDrag?: (data: ChessboardCallbackParams) => void | false;
  onPieceDragStop?: (data: ChessboardCallbackParams) => void | false;
};

export type ChessboardCallbackParams = {
  e: DraggableEvent;
  data: DraggableData;
  chessPiece: ChessPiece;
  boardRef: RefObject<HTMLDivElement>;
  setHoverState: Dispatch<SetStateAction<HoverState>>;
};
