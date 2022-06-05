import React, { FC } from 'react';

import './style.scss';

interface LoaderProps {
  text: string;
}

const Loader: FC<LoaderProps> = ({ text }) => {
  return (
    <div className="spinner">
      <div className="loadingio-spinner-ellipsis-57ekl48z0o3">
        <div className="ldio-ogtm8crjy8g">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <span className="font-heading text-center font-bold">{text}</span>
    </div>
  );
};

export default Loader;
