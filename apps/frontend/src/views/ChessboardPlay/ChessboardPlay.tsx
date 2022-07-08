import Chessboard from 'components/Chessboard';
import { ChessGame, useChessGame } from 'hooks/useChessGame';
import { useState } from 'react';

const ChessboardPlay = () => {
  const [chessGame, setChessGame] = useState({});
  const { chessInterface } = useChessGame(chessGame);

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-[640px] h-[640px]">
        <Chessboard board={chessInterface.getBoard()} />
      </div>
    </div>
  );
};

export default ChessboardPlay;
