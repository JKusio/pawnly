import { HoverState } from 'components/HoverSquare';
import { ChessPiece, ChessSquare } from 'lib/chess/ChessInterface';
import { Dispatch, SetStateAction } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';

export type ChessboardProps = {
  board: ChessSquare[][];
  pieceBound?: string | false;
  hoverState?: HoverState;
  boardOverlay?: (string | null)[][];
  onPieceDragStart?: (data: ChessboardCallbackParams) => void | false;
  onPieceDrag?: (data: ChessboardCallbackParams) => void | false;
  onPieceDragStop?: (data: ChessboardCallbackParams) => void | false;
};

export type ChessboardCallbackParams = {
  e: DraggableEvent;
  data: DraggableData;
  chessPiece: ChessPiece;
};
