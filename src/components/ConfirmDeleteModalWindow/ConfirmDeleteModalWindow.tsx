import { ConfirmDeleteModalWindowProps } from './types';
import { deleteBoard } from '../../redux/actions/board';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateBoardsData } from '../../redux/reducers/boards/boardsStateSlice';
import { ColumnInterface, TaskInterface } from '../../types';
import { deleteColumn, deleteTask } from '../../redux/reducers/board/ActionsBoard';
import { updateColumnsData } from '../../redux/reducers/board/boardStateSlice';
import { findIndex, cloneDeep } from 'lodash';
import warning from '../../assets/images/warning.svg';
import { deleteUser } from '../UserEditForm/UserEditAction';
import { logoutUser } from '../../redux/user/actions';
import { useContext } from 'react';
import { ToastContext } from '../../contexts/ToastContext';
import { useTranslation } from 'react-i18next';
import BoardCardProps from '../BoardCard/types';

function ConfirmDeleteModalWindow({
  id,
  title,
  type,
  onClose,
}: ConfirmDeleteModalWindowProps): JSX.Element {
  const boardsData = useAppSelector((state) => state.boardsReducer.boardsData);
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const { dispatch: toastDispatch } = useContext(ToastContext);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const submitDeleteHandler = async () => {
    switch (type) {
      case 'board':
        deleteBoard(dispatch, id);
        const boards: BoardCardProps[] = boardsData.filter((board) => board.id !== id);
        dispatch(updateBoardsData(boards));
        break;
      case 'column':
        const columns: ColumnInterface[] = boardData.columns.filter((column) => column.id !== id);
        dispatch(deleteColumn({ title, columnId: id, boardId: boardData.id }));
        dispatch(updateColumnsData(columns));
        break;
      case 'task':
        const columnId = boardData.columns.filter((column: ColumnInterface) => {
          if (findIndex(column.tasks, (task: TaskInterface) => task.id === id) !== -1) {
            return column;
          }
        })[0].id;
        const columnIndex = findIndex(
          boardData.columns,
          (column: ColumnInterface) => column.id === columnId
        );
        dispatch(deleteTask({ title, columnId, boardId: boardData.id, taskId: id }));
        const tasks: TaskInterface[] = boardData.columns[columnIndex].tasks.filter(
          (task) => task.id !== id
        );
        const newColumns = cloneDeep(boardData.columns);
        newColumns[columnIndex].tasks = tasks;
        dispatch(updateColumnsData(newColumns));
        break;
      case 'user':
        const res = await deleteUser(dispatch, id);
        if (res === 204) {
          toastDispatch({ type: 'SUCCESS', payload: t('_TOAST_USER_DELETED_') });
          dispatch(logoutUser());
        } else {
          toastDispatch({ type: 'ERROR', payload: t('_ERR_USER_NOT_DELETED_') });
        }
    }
  };

  return (
    <div className="relative w-full h-full md:h-auto">
      <div className="p-6 gap-6 flex flex-col items-center">
        <img src={warning} alt="" />
        <p className="text-m">{`${t('_LBL_SURE_TO_DELETE_')} ${type} '${title}'?`}</p>
        <div className="buttons-wrapper">
          <button
            data-modal-toggle="popup-modal"
            type="button"
            className="button button--cancel"
            onClick={onClose}
          >
            {t('_BTN_NO_CANCEL_')}
          </button>
          <button
            data-modal-toggle="popup-modal"
            type="button"
            className="button button--delete"
            onClick={submitDeleteHandler}
          >
            {t('_BTN_YES_IM_SURE_')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModalWindow;
