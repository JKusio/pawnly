import React, { useState } from 'react';

export type HoverState = {
  visible: 'invisible' | 'visible';
  position: string;
};

export const HoverSquare = ({
  sharedHoverState
}: {
  sharedHoverState: HoverState;
}) => {
  return (
    <div
      className={`w-1/8 h-1/8 border-4 border-white opacity-70 absolute ${sharedHoverState.position} ${sharedHoverState.visible}`}
    ></div>
  );
};

export default HoverSquare;
