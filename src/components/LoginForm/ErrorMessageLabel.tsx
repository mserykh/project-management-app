import React from 'react';

interface ErrorMessageLabelPropsI {
  children: React.ReactNode;
}

const ErrorMessageLabel: React.FC<ErrorMessageLabelPropsI> = ({ children }) => {
  return (
    <span className="mt-[5px] text-[#e74c3c] text-[0.975rem] block text-left">{children}</span>
  );
};

export default ErrorMessageLabel;
