import { ChessInterface, ChessPiece } from 'lib/chess/ChessInterface';
import { useEffect, useState } from 'react';

export type ChessVisualization = {
  chessInterface: ChessInterface;
  memorizedPieces: ChessPiece[];
};

export const useChessboardVisualization = (
  chessVisualization: Partial<ChessVisualization>
) => {
  const [chessInterface, setChessInterface] = useState(() =>
    chessVisualization.chessInterface
      ? chessVisualization.chessInterface
      : new ChessInterface()
  );
  const [memorizedPieces, setMemorizedPieces] = useState<ChessPiece[]>([]);

  useEffect(() => {
    return () => {
      if (chessVisualization.chessInterface) {
        setChessInterface(chessVisualization.chessInterface);
      }

      if (chessVisualization.memorizedPieces) {
        setMemorizedPieces(chessVisualization.memorizedPieces);
      }
    };
  }, [chessVisualization]);

  return {
    chessInterface
  };
};
