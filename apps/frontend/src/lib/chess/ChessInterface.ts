import { Chess, ChessInstance, PieceType, Square } from 'chess.js';

export type PieceColor = 'b' | 'w';

export type ChessPiece = {
  type: PieceType;
  color: PieceColor;
  square: Square;
};

export type ChessSquare = ChessPiece | null;

export class ChessInterface {
  private chess: ChessInstance;

  constructor() {
    this.chess = new Chess();
  }

  public getBoard(): ChessSquare[][] {
    return this.chess.board();
  }
}
