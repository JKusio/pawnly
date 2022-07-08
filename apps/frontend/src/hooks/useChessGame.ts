import { ChessInterface } from 'lib/chess/ChessInterface';
import { useEffect, useState } from 'react';

export type ChessGame = {
  chessInterface: ChessInterface;
};

export const useChessGame = (chessGame: Partial<ChessGame>) => {
  const [chessInterface, setChessInterface] = useState(new ChessInterface());

  useEffect(() => {
    return () => {
      if (chessGame.chessInterface) {
        setChessInterface(chessGame.chessInterface);
      }
    };
  }, [chessGame]);

  return {
    chessInterface
  };
};
