import { createContext, ReactNode, useReducer } from 'react';
import { toast } from 'react-toastify';

type ToastAction = {
  SUCCESS: 'SUCCESS';
  WARNING: 'WARNING';
  ERROR: 'ERROR';
};

interface Action {
  type: keyof ToastAction;
  payload: string;
}

interface ToastContextState {
  message: string;
  dispatch: (action: Action) => void;
}

interface ProviderProps {
  children: ReactNode;
}

const initialState: ToastContextState = {
  message: '',
  dispatch: (action: Action) => {},
};

function reducer(state: { message: string }, action: Action) {
  switch (action.type) {
    case 'SUCCESS':
      toast.success(action.payload);
      return { message: action.payload };
    case 'ERROR':
      toast.error(action.payload);
      return { message: action.payload };
    case 'WARNING':
      toast.warning(action.payload);
      return { message: action.payload };
    default:
      return state;
  }
}

export const ToastContext = createContext(initialState);

export const ToastProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, { message: '' });

  return (
    <ToastContext.Provider value={{ message: state.message, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};
