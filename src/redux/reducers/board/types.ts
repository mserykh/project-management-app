import { BoardInterface, UserInterface } from '../../../types';

export interface boardStateInterface {
  boardData: BoardInterface;
  loading: boolean;
  deleteModalOpen: boolean;
  updateModalOpen: boolean;
  users: UserInterface[];
  error: string;
}
