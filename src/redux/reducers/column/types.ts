import { ColumnInterface } from '../../../types';

export interface columnStateInterface {
    columnData: ColumnInterface;
    loading: boolean;
    deleteModalOpen: boolean;
    updateModalOpen: boolean;
    error: string;
}
