import React, { FC } from 'react';

const MiniLoader: FC = () => {
  return (
    <div className="inline relative top-[4px]">
      <div
        style={{ borderTopColor: 'transparent' }}
        className="w-6 h-6 border-2 border-[#1bd993] border-solid rounded-full animate-spin ml-4 inline-block"
      ></div>
    </div>
  );
};

export default MiniLoader;
