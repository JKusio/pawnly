import React, { memo, useEffect } from 'react';

export type HoverState = {
  visible: 'invisible' | 'visible';
  position: string;
};

export const BASIC_HOVER_STATE: HoverState = {
  visible: 'invisible',
  position: 'board-position-00'
};

export const HoverSquare = memo(({ position, visible }: HoverState) => {
  return (
    <div
      className={`w-1/8 h-1/8 border-4 border-white opacity-70 absolute ${position} ${visible}`}
    ></div>
  );
});

export default HoverSquare;
