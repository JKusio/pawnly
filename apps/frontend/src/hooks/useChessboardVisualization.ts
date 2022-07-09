import { ChessInterface } from 'lib/chess/ChessInterface';
import { useEffect, useState } from 'react';

export type ChessVisualization = {
  chessInterface: ChessInterface;
};

export const useChessboardVisualization = (
  chessVisualization: Partial<ChessVisualization>
) => {
  const [chessInterface, setChessInterface] = useState(() =>
    chessVisualization.chessInterface
      ? chessVisualization.chessInterface
      : new ChessInterface()
  );

  useEffect(() => {
    return () => {
      if (chessVisualization.chessInterface) {
        setChessInterface(chessVisualization.chessInterface);
      }
    };
  }, [chessVisualization]);

  return {
    chessInterface
  };
};
