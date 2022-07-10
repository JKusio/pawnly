import { ChessInterface, ChessSquare } from 'lib/chess/ChessInterface';
import { useEffect, useState } from 'react';

export enum ChessVisualizationState {
  Memorize = 'Memorize',
  Place = 'Place',
  Results = 'Results'
}

export type ChessVisualization = {
  chessInterface: ChessInterface;
  memorizedBoard: ChessSquare[][];
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
  const [memorizedBoard, setMemorizedBoard] = useState(
    Array.from(Array(8), (_) => Array(8).fill(null))
  );
  const [state, setState] = useState(ChessVisualizationState.Memorize);

  useEffect(() => {
    return () => {
      if (chessVisualization.chessInterface) {
        setChessInterface(chessVisualization.chessInterface);
      }

      if (chessVisualization.memorizedBoard) {
        setMemorizedBoard(chessVisualization.memorizedBoard);
      }
    };
  }, [chessVisualization]);

  return {
    chessInterface,
    memorizedBoard,
    state
  };
};
