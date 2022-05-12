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
      <div className="fixed inset-0 overflow-hidden bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="top-2/4 -translate-y-1/2 mx-auto max-w-lg relative flex bg-white rounded-3xl transition-all">
          <span className="px-4 py-4 self-start cursor-pointer hover:bg-gray-100" onClick={onClose}>
            x
          </span>
          <div className="px-4 py-4">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
