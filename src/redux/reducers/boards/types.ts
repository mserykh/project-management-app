import BoardCardProps from '../../../components/BoardCard/types';

export interface boardsStateInterface {
  boardsData: BoardCardProps[] | [];
  loading: boolean;
  deleteModalOpen: boolean;
  updateModalOpen: boolean;
  error: string;
}
