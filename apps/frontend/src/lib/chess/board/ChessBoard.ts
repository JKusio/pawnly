import { Bishop } from '../pieces/Bishop';
import { ChessPiece } from '../pieces/ChessPiece';
import { Color } from '../pieces/Color';
import { King } from '../pieces/King';
import { Knight } from '../pieces/Knight';
import { Pawn } from '../pieces/Pawn';
import { Queen } from '../pieces/Queen';
import { Rook } from '../pieces/Rook';

export type ChessSquare = ChessPiece | null;

export type Board = ChessSquare[][];

export class ChessBoard {
  public board: Board;

  constructor(board?: Board) {
    this.board = board ?? this.getBasicBoard();
  }

  private getBasicBoard(): Board {
    return [
      [
        new Rook({ color: Color.White }),
        new Knight({ color: Color.White }),
        new Bishop({ color: Color.White }),
        new Queen({ color: Color.White }),
        new King({ color: Color.White }),
        new Bishop({ color: Color.White }),
        new Knight({ color: Color.White }),
        new Rook({ color: Color.White })
      ],
      [
        new Pawn({ color: Color.White }),
        new Pawn({ color: Color.White }),
        new Pawn({ color: Color.White }),
        new Pawn({ color: Color.White }),
        new Pawn({ color: Color.White }),
        new Pawn({ color: Color.White }),
        new Pawn({ color: Color.White }),
        new Pawn({ color: Color.White })
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new Pawn({ color: Color.Black }),
        new Pawn({ color: Color.Black }),
        new Pawn({ color: Color.Black }),
        new Pawn({ color: Color.Black }),
        new Pawn({ color: Color.Black }),
        new Pawn({ color: Color.Black }),
        new Pawn({ color: Color.Black }),
        new Pawn({ color: Color.Black })
      ],
      [
        new Rook({ color: Color.Black }),
        new Knight({ color: Color.Black }),
        new Bishop({ color: Color.Black }),
        new Queen({ color: Color.Black }),
        new King({ color: Color.Black }),
        new Bishop({ color: Color.Black }),
        new Knight({ color: Color.Black }),
        new Rook({ color: Color.Black })
      ]
    ];
  }
}
