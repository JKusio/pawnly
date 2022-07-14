import { ChessInterface, ChessSquare } from 'lib/chess/ChessInterface';
import { useEffect, useState } from 'react';
import { getDifferenceBoard } from 'utils/chess';

export enum ChessVisualizationState {
  Memorize = 'Memorize',
  Place = 'Place',
  Results = 'Results'
}

export type ChessVisualization = {
  chessInterface: ChessInterface;
  board: ChessSquare[][];
  boardOverlay: (string | null)[][];
  state: ChessVisualizationState;
};

export const useChessboardVisualization = (
  chessVisualization: Partial<ChessVisualization>
): ChessVisualization => {
  const [chessInterface, setChessInterface] = useState(() =>
    chessVisualization.chessInterface
      ? chessVisualization.chessInterface
      : new ChessInterface()
  );
  const [board, setBoard] = useState(chessInterface.getBoard());
  const [boardOverlay, setBoardOverlay] = useState(() =>
    Array.from(Array(8), (_) => Array(8).fill(null))
  );
  const [state, setState] = useState(ChessVisualizationState.Memorize);

  useEffect(() => {
    if (chessVisualization.chessInterface) {
      setChessInterface(chessVisualization.chessInterface);
    }

    if (chessVisualization.board) {
      setBoard(chessVisualization.board);
    }

    if (chessVisualization.state) {
      setState(chessVisualization.state);

      if (chessVisualization.state === ChessVisualizationState.Place) {
        setBoard(Array.from(Array(8), (_) => Array(8).fill(null)));
      }

      if (chessVisualization.state === ChessVisualizationState.Results) {
        const originalBoard = chessInterface.getBoard();

        console.log(originalBoard);
        console.log(board);

        const differenceBoard = getDifferenceBoard(originalBoard, board);
        // const differencesCount = differenceBoard.reduce(
        //   (prev, current) => (prev += current.reduce((p, c) => p + (c ? 0 : 1), 0)),
        //   0
        // );

        console.log(differenceBoard);
        const boardOverlay = differenceBoard.map((row) =>
          row.map((square) => {
            if (square === null) {
              return null;
            }

            if (!square) {
              return 'bg-chessboard-error';
            }

            return 'bg-chessboard-correct';
          })
        );

        setBoard(chessInterface.getBoard());
        setBoardOverlay(boardOverlay);
      }
    }
  }, [chessVisualization]);

  return {
    chessInterface,
    board,
    boardOverlay,
    state
  };
};
