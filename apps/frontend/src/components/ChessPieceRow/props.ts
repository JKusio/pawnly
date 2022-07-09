import { ChessPieceCallbackParams } from 'components/ChessPiece/props';
import { PieceColor } from 'lib/chess/ChessInterface';

export type ChessPieceRowProps = {
  color: PieceColor;
  pieceSize: string;
  onPieceDragStop?: (data: ChessPieceCallbackParams) => void | false;
};
