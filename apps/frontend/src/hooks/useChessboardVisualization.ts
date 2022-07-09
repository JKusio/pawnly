import { ChessInterface, ChessSquare } from 'lib/chess/ChessInterface';
import { useEffect, useState } from 'react';

export type ChessVisualization = {
  chessInterface: ChessInterface;
  memorizedBoard: ChessSquare[][];
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
    memorizedBoard
  };
};
