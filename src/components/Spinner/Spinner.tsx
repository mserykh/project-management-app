import React, { FC } from 'react';

import './style.scss';

interface SpinnerProps {
  text: string;
}

const Spinner: FC<SpinnerProps> = ({ text }) => {
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
      <span>{text}</span>
    </div>
  );
};

export default Spinner;
