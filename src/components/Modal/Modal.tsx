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
    <>
      <div className="fixed z-20 inset-0 overflow-hidden bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="relative top-2/4 -translate-y-1/2 mx-auto max-w-lg flex bg-white rounded-3xl transition-all">
          <button
            className="absolute flex justify-center items-center p-4 cursor-pointer z-10 hover:bg-gray-100 hover:rounded-full"
            onClick={onClose}
          >
            <img src={close} alt="" />
            <span className="sr-only"></span>
          </button>
          <div className="px-4 py-4">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
