import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  buttonStyle: string;
};

const Button = ({ children, type, onClick, buttonStyle }: ButtonProps): JSX.Element => {
  return (
    <button className={`btn ${buttonStyle}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
