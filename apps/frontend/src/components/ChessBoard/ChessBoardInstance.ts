import { Board } from './Board';

export class ChessBoardInstance {
  public board: Board;

  constructor(board?: Board) {
    this.board = board || [
      [4, 2, 3, 5, 6, 3, 2, 4],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [7, 7, 7, 7, 7, 7, 7, 7],
      [10, 8, 9, 11, 12, 9, 8, 10]
    ];
  }
}
