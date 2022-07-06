import { ChessPiece, Position } from './ChessPiece';
import { Color } from './Color';
import { Piece } from './Piece';

export class Bishop implements ChessPiece {
  public color: Color;
  public piece: Piece;

  constructor(data: { color: Color }) {
    this.color = data.color;
    this.piece = Piece.Bishop;
  }

  public getPossibleMoves(position: Position): Position[] {
    return [];
  }
}
