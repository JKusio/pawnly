import { ChessBoard } from 'lib/chess/board/ChessBoard';
import { ChessPiece } from './ChessPiece';

const ChessBoardComponent = () => {
  const chessBoard = new ChessBoard();

  return (
    <div className="w-full h-full bg-[url('https://images.chesscomfiles.com/chess-themes/boards/walnut/150.jpg')] bg-center bg-cover relative">
      {chessBoard.board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            return (
              <ChessPiece
                piece={piece.piece}
                color={piece.color}
                position={{ x, y }}
              />
            );
          }
        })
      )}
    </div>
  );
};

export default ChessBoardComponent;