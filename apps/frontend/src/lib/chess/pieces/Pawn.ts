import { ChessPiece, Position } from './ChessPiece';
import { Color } from './Color';
import { Piece } from './Piece';

export class Pawn implements ChessPiece {
  public color: Color;
  public piece: Piece;

  constructor(data: { color: Color }) {
    this.color = data.color;
    this.piece = Piece.Pawn;
  }

  public getPossibleMoves(position: Position): Position[] {
    return [];
  }
}
