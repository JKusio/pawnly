import { ChessBoardInstance } from './ChessBoardInstance';
import { ChessPiece } from './ChessPiece';
import { Color } from './Color';
import { Piece } from './Piece';

const ChessBoard = () => {
  const chessBoardInstance = new ChessBoardInstance();

  return (
    <div className="w-full h-full bg-[url('https://images.chesscomfiles.com/chess-themes/boards/walnut/150.jpg')] bg-center bg-cover relative">
      {chessBoardInstance.board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== 0) {
            return (
              <ChessPiece
                piece={Piece.Pawn}
                color={Color.White}
                position={{ x, y }}
              />
            );
          }
        })
      )}
      <ChessPiece
        piece={Piece.Pawn}
        color={Color.White}
        position={{ x: 0, y: 0 }}
      />
    </div>
  );
};

export default ChessBoard;
