import Chessboard from 'components/Chessboard';
import { ChessboardCallbackParams } from 'components/Chessboard/props';
import { ChessPieceCallbackParams } from 'components/ChessPiece/props';
import ChessPieceRow from 'components/ChessPieceRow';
import Countdown from 'components/Countdown';
import { BASIC_HOVER_STATE, HoverState } from 'components/HoverSquare';
import {
  ChessVisualization,
  ChessVisualizationState,
  useChessboardVisualization
} from 'hooks';
import { ChessInterface } from 'lib/chess/ChessInterface';
import { useEffect, useRef, useState } from 'react';
import {
  BoardCords,
  calculateBoardCords,
  getBoardSquare,
  getChessSquareClass,
  getCordsFromSquare,
  getDifferenceBoard
} from 'utils/chess';
import { trpc } from 'utils/trpc';

const PGN =
  '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2022.07.02"]\n[Round "-"]\n[White "JKusiow"]\n[Black "kozubenko"]\n[Result "0-1"]\n[CurrentPosition "1r5k/2Q2ppp/p2p4/8/P7/6PP/3q3K/8 w - -"]\n[Timezone "UTC"]\n[ECO "C65"]\n[ECOUrl "https://www.chess.com/openings/Ruy-Lopez-Opening-Berlin-Beverwijk-Variation-5.c3"]\n[UTCDate "2022.07.02"]\n[UTCTime "14:06:06"]\n[WhiteElo "1078"]\n[BlackElo "1132"]\n[TimeControl "900+10"]\n[Termination "kozubenko won by resignation"]\n[StartTime "14:06:06"]\n[EndDate "2022.07.02"]\n[EndTime "14:32:24"]\n[Link "https://www.chess.com/game/live/50509779363"]\n\n1. e4 {[%clk 0:15:06.3]} 1... e5 {[%clk 0:15:08.9]} 2. Nf3 {[%clk 0:15:13.1]} 2... Nc6 {[%clk 0:15:18.1]} 3. Bb5 {[%clk 0:15:21.6]} 3... Nf6 {[%clk 0:15:25.4]} 4. O-O {[%clk 0:15:29]} 4... Bc5 {[%clk 0:14:57]} 5. c3 {[%clk 0:15:26.7]} 5... d6 {[%clk 0:14:51.3]} 6. d3 {[%clk 0:14:39.9]} 6... O-O {[%clk 0:14:49.6]} 7. Bg5 {[%clk 0:14:34.1]} 7... a6 {[%clk 0:14:51.8]} 8. Ba4 {[%clk 0:14:39.3]} 8... b5 {[%clk 0:15:00.1]} 9. Bb3 {[%clk 0:14:43]} 9... b4 {[%clk 0:15:02.5]} 10. d4 {[%clk 0:14:23]} 10... exd4 {[%clk 0:14:59]} 11. cxd4 {[%clk 0:14:30.6]} 11... Bb6 {[%clk 0:14:49.3]} 12. a4 {[%clk 0:14:29.2]} 12... Bg4 {[%clk 0:14:47.8]} 13. h3 {[%clk 0:14:12.8]} 13... Bxf3 {[%clk 0:14:54.8]} 14. Qxf3 {[%clk 0:14:21.1]} 14... Nxd4 {[%clk 0:14:56.3]} 15. Qd3 {[%clk 0:13:57.2]} 15... Nxb3 {[%clk 0:14:47.4]} 16. Qxb3 {[%clk 0:13:56]} 16... Bd4 {[%clk 0:14:49.8]} 17. Qxb4 {[%clk 0:13:43.4]} 17... c5 {[%clk 0:14:55.3]} 18. Bxf6 {[%clk 0:13:22.2]} 18... Bxf6 {[%clk 0:15:02]} 19. Qd2 {[%clk 0:13:14.8]} 19... Rb8 {[%clk 0:15:03.5]} 20. Ra2 {[%clk 0:12:42.8]} 20... Qb6 {[%clk 0:14:47.3]} 21. e5 {[%clk 0:12:11.5]} 21... Bxe5 {[%clk 0:14:28.8]} 22. Nc3 {[%clk 0:12:01.7]} 22... Qb7 {[%clk 0:13:54.1]} 23. Rb1 {[%clk 0:11:45]} 23... Rfd8 {[%clk 0:12:54.1]} 24. Nd5 {[%clk 0:11:28]} 24... c4 {[%clk 0:12:42]} 25. b4 {[%clk 0:10:41.4]} 25... cxb3 {[%clk 0:12:10.5]} 26. Ra3 {[%clk 0:10:12.9]} 26... b2 {[%clk 0:12:06.8]} 27. Ra2 {[%clk 0:10:08.4]} 27... Rdc8 {[%clk 0:11:11.9]} 28. f4 {[%clk 0:10:15.7]} 28... Bf6 {[%clk 0:11:07.9]} 29. Nxf6+ {[%clk 0:10:24.2]} 29... Kh8 {[%clk 0:10:54.2]} 30. Nd5 {[%clk 0:09:12.3]} 30... Rc1+ {[%clk 0:10:02.6]} 31. Rxc1 {[%clk 0:08:57.5]} 31... bxc1=Q+ {[%clk 0:10:07.8]} 32. Qxc1 {[%clk 0:09:06.2]} 32... Qxd5 {[%clk 0:10:15.6]} 33. Rd2 {[%clk 0:08:55.2]} 33... Qe6 {[%clk 0:10:02.3]} 34. Qc7 {[%clk 0:07:57.6]} 34... Qe3+ {[%clk 0:08:50.9]} 35. Kh2 {[%clk 0:07:57.1]} 35... Qxf4+ {[%clk 0:08:45.2]} 36. g3 {[%clk 0:07:12]} 36... Qxd2+ {[%clk 0:08:51]} 0-1\n';

const COUNTDOWN_TIME = 30;

const ChessboardVisualization = () => {
  const [boardVisualization, setBoardVisualization] = useState<
    Partial<ChessVisualization>
  >({ chessInterface: new ChessInterface(PGN) });
  const [hoverState, setHoverState] = useState(BASIC_HOVER_STATE);
  const { chessInterface, board, boardOverlay, state } =
    useChessboardVisualization(boardVisualization);

  const countdownCallback = () => {
    setBoardVisualization({ state: ChessVisualizationState.Place });
  };

  const boardRef = useRef<HTMLDivElement>(null);

  const onPieceDrag = ({ data }: ChessboardCallbackParams) => {
    const cords = calculateBoardCords(data, boardRef);

    if (!cords) {
      setHoverState(BASIC_HOVER_STATE);
      return;
    }

    const square = getBoardSquare(cords.x, cords.y);
    const position = getChessSquareClass(square);

    setHoverState((state: HoverState) =>
      state.position !== position ? { visible: 'visible', position } : state
    );
  };

  const onPieceDragStop = ({ data, chessPiece }: ChessboardCallbackParams) => {
    setHoverState(BASIC_HOVER_STATE);

    const cords = calculateBoardCords(data, boardRef);

    // handle piece on board
    if (chessPiece.square) {
      const pieceCords = getCordsFromSquare(chessPiece.square) as BoardCords;

      if (!cords) {
        board[pieceCords.y][pieceCords.x] = null;
        setBoardVisualization({ board });
        return false;
      }

      if (pieceCords.x === cords.x && pieceCords.y === cords.y) {
        return;
      }

      const square = getBoardSquare(cords.x, cords.y);
      board[pieceCords.y][pieceCords.x] = null;
      board[cords.y][cords.x] = { ...chessPiece, square };
      setBoardVisualization({ board });
      return false;
    }
    // handle piece from row
    else {
      if (!cords) {
        return;
      }

      const square = getBoardSquare(cords.x, cords.y);
      board[cords.y][cords.x] = { ...chessPiece, square };
      setBoardVisualization({ board });
    }
  };

  const submit = () => {
    setBoardVisualization({
      state: ChessVisualizationState.Results
    });
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center flex-col">
      <div
        className={`${
          state === ChessVisualizationState.Place ? 'flex' : 'hidden'
        } w-[640px] justify-around my-4 relative`}
      >
        <ChessPieceRow
          color="b"
          pieceClassName="w-[80px] h-[80px] z-20"
          onPieceDrag={onPieceDrag}
          onPieceDragStop={onPieceDragStop}
        />
        <div className="w-full flex justify-around absolute z-10">
          <ChessPieceRow
            color="b"
            pieceClassName="w-[80px] h-[80px] z-10"
            disabled={true}
          />
        </div>
      </div>
      <div
        className={`${
          state === ChessVisualizationState.Memorize ? 'flex' : 'hidden'
        } w-[640px] justify-center text-6xl text-white font-bold my-4`}
      >
        <Countdown length={COUNTDOWN_TIME} callback={countdownCallback} />
      </div>
      <div className="w-[640px] h-[640px]">
        <Chessboard
          board={board}
          hoverState={hoverState}
          onPieceDrag={onPieceDrag}
          onPieceDragStop={onPieceDragStop}
          boardOverlay={boardOverlay}
          pieceBound={false}
          disabled={state !== ChessVisualizationState.Place}
          ref={boardRef}
        />
      </div>
      <div
        className={`${
          state === ChessVisualizationState.Place ? 'flex' : 'hidden'
        } w-[640px] justify-around my-4 relative`}
      >
        <ChessPieceRow
          color="w"
          pieceClassName="w-[80px] h-[80px] z-20"
          onPieceDrag={onPieceDrag}
          onPieceDragStop={onPieceDragStop}
        />
        <div className="w-full flex justify-around absolute">
          <ChessPieceRow
            color="w"
            pieceClassName="w-[80px] h-[80px] z-10"
            disabled={true}
          />
        </div>
      </div>
      <div
        className={`${
          state === ChessVisualizationState.Place ? 'flex' : 'hidden'
        } w-full flex justify-center`}
      >
        <button
          className="w-[120px] h-[40px] bg-[#DAF7A6] rounded-md"
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChessboardVisualization;
