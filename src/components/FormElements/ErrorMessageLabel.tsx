import React from 'react';

interface ErrorMessageLabelPropsI {
  children: React.ReactNode;
}

const ErrorMessageLabel: React.FC<ErrorMessageLabelPropsI> = ({ children }) => {
  return (
    <span className="mt-[5px] text-[#e74c3c] text-[0.875rem] block text-left absolute">
      {children}
    </span>
  );
};

export default ErrorMessageLabel;
