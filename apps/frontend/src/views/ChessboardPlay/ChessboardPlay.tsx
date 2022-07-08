import Chessboard from 'components/Chessboard';
import { ChessGame, useChessGame } from 'hooks/useChessGame';
import { ChessPiece } from 'lib/chess/ChessInterface';
import { RefObject, useState } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';

const ChessboardPlay = () => {
  const [chessGame, setChessGame] = useState({});
  const { chessInterface } = useChessGame(chessGame);

  const onPieceDragStop = (
    e: DraggableEvent,
    data: DraggableData,
    chessPiece: ChessPiece,
    boardRef: RefObject<HTMLDivElement>
  ) => {
    console.log(e, data, chessPiece, boardRef);
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-[640px] h-[640px]">
        <Chessboard
          board={chessInterface.getBoard()}
          onPieceDragStop={onPieceDragStop}
        />
      </div>
    </div>
  );
};

export default ChessboardPlay;
