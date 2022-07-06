const CHESS_COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const getBoardSquare = (x: number, y: number): string => {
  if (x >= 8 || y >= 8) {
    return 'a1';
  }

  return `${CHESS_COLUMNS[x]}${y + 1}`;
};
