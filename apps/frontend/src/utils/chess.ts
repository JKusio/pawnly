import { Square } from 'chess.js';
import { ChessPiece, ChessSquare } from 'lib/chess/ChessInterface';
import { RefObject } from 'react';
import { DraggableData } from 'react-draggable';

const CHESS_COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const getBoardSquare = (x: number, y: number): Square => {
  if (x >= 8 || y >= 8) {
    return 'a1';
  }

  // This will always return correct square
  return `${CHESS_COLUMNS[x]}${y + 1}` as Square;
};

export const getChessSquareClass = (square: Square) => {
  return `board-position-${square}`;
};

export const getPiecesFromBoard = (board: ChessSquare[][]): ChessPiece[] => {
  const pieces: ChessPiece[] = [];

  for (const boardRow of board) {
    for (const square of boardRow) {
      if (!!square) {
        pieces.push(square);
      }
    }
  }

  return pieces;
};

export type BoardCords = {
  x: number;
  y: number;
};

export const calculateBoardCords = (
  data?: DraggableData,
  boardRef?: RefObject<HTMLDivElement>
): BoardCords | null => {
  if (!data || !boardRef || !boardRef.current) {
    return null;
  }

  const {
    x: boardX,
    y: boardY,
    width: boardSize
  } = boardRef.current.getBoundingClientRect();
  const {
    x: pieceX,
    y: pieceY,
    width: pieceSize
  } = data.node.getBoundingClientRect();

  const center = pieceSize / 2;

  const xDiff = pieceX - boardX + center;
  const yDiff = pieceY - boardY + center;

  if (xDiff < 0 || yDiff < 0) {
    return null;
  }

  if (xDiff > boardSize || yDiff > boardSize) {
    return null;
  }

  const squareSize = boardSize / 8;

  const x = Math.floor(xDiff / squareSize);
  const y = 7 - Math.floor(yDiff / squareSize);

  return { x, y };
};
