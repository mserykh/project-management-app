import React, { FC } from 'react';

const MiniLoader: FC = () => {
  return (
    <div className="inline relative top-1">
      <div
        style={{ borderTopColor: 'transparent' }}
        className="w-6 h-6 border-2 border-primaryGreen border-solid rounded-full animate-spin ml-4 inline-block"
      ></div>
    </div>
  );
};

export default MiniLoader;
