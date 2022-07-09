import { ChessPieceCallbackParams } from 'components/ChessPiece/props';
import { PieceColor } from 'lib/chess/ChessInterface';

export type ChessPieceRowProps = {
  color: PieceColor;
  pieceClassName: string;
  disabled?: boolean;
  onPieceDragStop?: (data: ChessPieceCallbackParams) => void | false;
};
