import { ChessPiece, Position } from './ChessPiece';
import { Color } from './Color';
import { Piece } from './Piece';

export class Knight implements ChessPiece {
  public color: Color;
  public piece: Piece;

  constructor(data: { color: Color }) {
    this.color = data.color;
    this.piece = Piece.Knight;
  }

  public getPossibleMoves(position: Position): Position[] {
    return [];
  }
}
