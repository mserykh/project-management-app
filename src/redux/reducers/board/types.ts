import { BoardInterface } from '../../../types';

export interface boardStateInterface {
    boardData: BoardInterface;
    loading: boolean;
    deleteModalOpen: boolean;
    updateModalOpen: boolean;
    error: string;
}
