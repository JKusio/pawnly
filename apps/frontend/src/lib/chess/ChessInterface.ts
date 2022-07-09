import { Chess, ChessInstance, Move, PieceType, Square } from 'chess.js';

export type PieceColor = 'b' | 'w';

export type ChessPiece = {
  type: PieceType;
  color: PieceColor;
  square: Square;
};

export type ChessSquare = ChessPiece | null;

export class ChessInterface {
  private chess: ChessInstance;

  constructor(pgn?: string) {
    this.chess = new Chess();

    if (pgn) {
      this.chess.load_pgn(pgn);
    }
  }

  public getBoard(): ChessSquare[][] {
    return this.chess.board();
  }

  public getMoves(square: string): Move[] {
    return this.chess.moves({ square, verbose: true });
  }

  public move(move: Move): Move | null {
    return this.chess.move(move);
  }

  public getPieces(): ChessPiece[] {
    return [];
  }
}
