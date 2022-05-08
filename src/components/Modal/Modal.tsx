import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpened: boolean;
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ isOpened, children, onClose }: ModalProps): JSX.Element => {
  if (!isOpened) {
    return <></>;
  }

  return createPortal(
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="mx-auto max-w-lg relative flex bg-white rounded-lg transition-all">
        <span className="px-4 py-4 cursor-pointer hover:bg-gray-100" onClick={onClose}>
          x
        </span>
        <div className="px-4 py-4">{children}</div>
      </div>
    </>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
