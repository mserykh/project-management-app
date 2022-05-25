import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import close from '../../assets/images/close.svg';

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
    <div className="fixed px-4 z-50 inset-0 overflow-hidden bg-black bg-opacity-50 transition-opacity">
      <div className="relative p-4 top-2/4 -translate-y-1/2 mx-auto max-w-lg bg-white rounded-3xl transition-all">
        <button
          className="flex justify-center items-center p-4 cursor-pointer z-49 hover:opacity-70 hover:rounded-full"
          onClick={onClose}
        >
          <img src={close} alt="" />
          <span className="sr-only"></span>
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
