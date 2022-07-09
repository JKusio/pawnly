import { PieceType } from 'chess.js';
import ChessPieceComponent from 'components/ChessPiece';
import { ChessPieceCallbackParams } from 'components/ChessPiece/props';
import { PieceColor } from 'lib/chess/ChessInterface';
import { ChessPieceRowProps } from './props';

const TYPES: PieceType[] = ['k', 'q', 'r', 'n', 'b', 'p'];

const ChessPieceRow = ({
  color,
  pieceSize,
  disabled,
  onPieceDragStop
}: ChessPieceRowProps) => {
  const handlePieceDragStop = (data: ChessPieceCallbackParams) => {
    if (onPieceDragStop) {
      return onPieceDragStop(data);
    }
  };

  return (
    <>
      {TYPES.map((type: PieceType) => (
        <ChessPieceComponent
          chessPiece={{ color, type, square: null }}
          className={pieceSize}
          bounds={false}
          key={`chess-piece-row-${color}-${type}`}
          onDragStop={handlePieceDragStop}
          disabled={disabled}
        />
      ))}
    </>
  );
};

export default ChessPieceRow;
