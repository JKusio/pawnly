import { Move, Square } from 'chess.js';
import Chessboard from 'components/Chessboard';
import { ChessboardCallbackParams } from 'components/Chessboard/props';
import { BASIC_HOVER_STATE, HoverState } from 'components/HoverSquare';
import { ChessGame, useChessGame } from 'hooks/useChessGame';
import { ChessPiece } from 'lib/chess/ChessInterface';
import { RefObject, useCallback, useState } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';
import {
  calculateBoardCords,
  getBoardSquare,
  getChessSquareClass
} from 'utils/chess';

const ChessboardPlay = () => {
  const [chessGame, setChessGame] = useState({});
  const { chessInterface } = useChessGame(chessGame);

  const makeMove = (from: Square, to: Square): boolean => {
    const moves = chessInterface.getMoves(from);

    const move = moves.find((move: Move) => move.to === to);

    if (!move) {
      return false;
    }

    chessInterface.move(move);

    return true;
  };

  const onPieceDrag = ({
    data,
    boardRef,
    setHoverState
  }: ChessboardCallbackParams) => {
    const cords = calculateBoardCords(data, boardRef);

    if (!cords) {
      return;
    }

    const square = getBoardSquare(cords.x, cords.y);
    const position = getChessSquareClass(square);

    setHoverState((state: HoverState) =>
      state.position !== position ? { visible: 'visible', position } : state
    );
  };

  const onPieceDragStop = ({
    data,
    boardRef,
    chessPiece,
    setHoverState
  }: ChessboardCallbackParams) => {
    const cords = calculateBoardCords(data, boardRef);

    if (!cords) {
      return;
    }

    const to = getBoardSquare(cords.x, cords.y);

    if (makeMove(chessPiece.square, to)) {
      setChessGame({ chessInterface });
      setHoverState(BASIC_HOVER_STATE);
      return false;
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-[640px] h-[640px]">
        <Chessboard
          board={chessInterface.getBoard()}
          onPieceDrag={onPieceDrag}
          onPieceDragStop={onPieceDragStop}
        />
      </div>
    </div>
  );
};

export default ChessboardPlay;
