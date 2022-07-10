import { ChessInterface, ChessSquare } from 'lib/chess/ChessInterface';
import { useEffect, useState } from 'react';

export enum ChessVisualizationState {
  Memorize = 'Memorize',
  Place = 'Place',
  Results = 'Results'
}

export type ChessVisualization = {
  chessInterface: ChessInterface;
  board: ChessSquare[][];
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
  const [state, setState] = useState(ChessVisualizationState.Memorize);

  useEffect(() => {
    if (chessVisualization.chessInterface) {
      setChessInterface(chessVisualization.chessInterface);
    }

    if (chessVisualization.board) {
      setBoard(chessVisualization.board);
    }

    if (chessVisualization.state) {
      console.log('xx');
      setState(chessVisualization.state);

      if (chessVisualization.state === ChessVisualizationState.Place) {
        setBoard(Array.from(Array(8), (_) => Array(8).fill(null)));
      }
    }
  }, [chessVisualization]);

  return {
    chessInterface,
    board,
    state
  };
};
