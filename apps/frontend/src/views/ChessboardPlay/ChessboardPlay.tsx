import { Move, Square } from 'chess.js';
import Chessboard from 'components/Chessboard';
import { ChessboardCallbackParams } from 'components/Chessboard/props';
import { BASIC_HOVER_STATE, HoverState } from 'components/HoverSquare';
import { useChessGame } from 'hooks/useChessGame';
import { useRef, useState } from 'react';
import {
  calculateBoardCords,
  getBoardSquare,
  getChessSquareClass
} from 'utils/chess';

const ChessboardPlay = () => {
  const [chessGame, setChessGame] = useState({});
  const [hoverState, setHoverState] = useState(BASIC_HOVER_STATE);
  const { chessInterface } = useChessGame(chessGame);
  const boardRef = useRef<HTMLDivElement>(null);

  const makeMove = (from: Square, to: Square): boolean => {
    const moves = chessInterface.getMoves(from);

    const move = moves.find((move: Move) => move.to === to);

    if (!move) {
      return false;
    }

    chessInterface.move(move);

    return true;
  };

  const onPieceDrag = ({ data }: ChessboardCallbackParams) => {
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

  const onPieceDragStop = ({ data, chessPiece }: ChessboardCallbackParams) => {
    if (!chessPiece.square) {
      return;
    }

    const cords = calculateBoardCords(data, boardRef);

    if (!cords) {
      return;
    }

    const to = getBoardSquare(cords.x, cords.y);

    setHoverState(BASIC_HOVER_STATE);

    if (makeMove(chessPiece.square, to)) {
      setChessGame({ chessInterface });
      return false;
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-[640px] h-[640px]">
        <Chessboard
          board={chessInterface.getBoard()}
          hoverState={hoverState}
          onPieceDrag={onPieceDrag}
          onPieceDragStop={onPieceDragStop}
          ref={boardRef}
        />
      </div>
    </div>
  );
};

export default ChessboardPlay;
