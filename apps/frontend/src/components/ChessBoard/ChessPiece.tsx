import Image from 'next/image';
import { Color } from './Color';
import { Piece } from './Piece';

const PIECE_MAP = {
  [Color.White]: {
    [Piece.Pawn]: '/assets/chess/pieces/Chess_plt60.png',
    [Piece.Knight]: '/assets/chess/pieces/Chess_nlt60.png',
    [Piece.Bishop]: '/assets/chess/pieces/Chess_blt60.png',
    [Piece.Rook]: '/assets/chess/pieces/Chess_rlt60.png',
    [Piece.Queen]: '/assets/chess/pieces/Chess_qlt60.png',
    [Piece.King]: '/assets/chess/pieces/Chess_klt60.png'
  },
  [Color.Black]: {
    [Piece.Pawn]: '/assets/chess/pieces/Chess_pdt60.png',
    [Piece.Knight]: '/assets/chess/pieces/Chess_ndt60.png',
    [Piece.Bishop]: '/assets/chess/pieces/Chess_bdt60.png',
    [Piece.Rook]: '/assets/chess/pieces/Chess_rdt60.png',
    [Piece.Queen]: '/assets/chess/pieces/Chess_qdt60.png',
    [Piece.King]: '/assets/chess/pieces/Chess_kdt60.png'
  }
};

const mapPieceToImage = (piece: Piece, color: Color): string => {
  return PIECE_MAP[color][piece];
};

export const ChessPiece = ({
  piece,
  color,
  position
}: {
  piece: Piece;
  color: Color;
  position: { x: number; y: number };
}) => {
  const image = mapPieceToImage(piece, color);
  const { x, y } = position;
  const piecePositionClassName = `chess-piece-${y}${x}`;

  return (
    <div className={`absolute w-1/8 h-1/8 ${piecePositionClassName}`}>
      <Image src={image} layout="fill" />
    </div>
  );
};
