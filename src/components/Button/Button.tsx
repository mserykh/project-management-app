import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className: string;
  isDisabled?: boolean;
};

const Button = ({
  children,
  type,
  onClick,
  className: className,
  isDisabled,
}: ButtonProps): JSX.Element => {
  return (
    <button className={`block ${className}`} onClick={onClick} type={type} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
