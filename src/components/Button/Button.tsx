import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  className: string;
};

const Button = ({ children, type, onClick, className: className }: ButtonProps): JSX.Element => {
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
