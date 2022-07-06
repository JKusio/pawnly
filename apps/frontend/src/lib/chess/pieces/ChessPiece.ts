import { Color } from './Color';
import { Piece } from './Piece';

export type Position = {
  x: number;
  y: number;
};

export interface ChessPiece {
  color: Color;
  piece: Piece;

  getPossibleMoves(position: Position): Array<Position>;
}
