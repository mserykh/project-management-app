import React from 'react';

interface ErrorMessageLabelPropsI {
  children: React.ReactNode;
}

const ErrorMessageLabel: React.FC<ErrorMessageLabelPropsI> = ({ children }) => {
  return <span className="text-red">{children}</span>;
};

export default ErrorMessageLabel;
