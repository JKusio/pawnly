import React, { memo } from 'react';

export type HoverState = {
  visible: 'invisible' | 'visible';
  position: string;
};

export const HoverSquare = memo(({
  position,
  visible
}: {
  position: string;
  visible: string;
}) => {
  return (
    <div
      className={`w-1/8 h-1/8 border-4 border-white opacity-70 absolute ${position} ${visible}`}
    ></div>
  );
});

export default HoverSquare;
