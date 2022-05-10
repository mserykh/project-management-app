import { BoardInterface } from '../../../types';

export interface boardsStateInterface {
  boardsData: BoardInterface[] | [];
  loading: boolean;
  deleteModalOpen: boolean;
  updateModalOpen: boolean;
  error: string;
}
