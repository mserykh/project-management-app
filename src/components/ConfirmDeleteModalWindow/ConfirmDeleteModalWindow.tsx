import { ConfirmDeleteModalWindowProps } from './types';
import { deleteBoard } from '../../redux/actions/board';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateBoardsData } from '../../redux/reducers/boards/boardsStateSlice';
import { BoardInterface, ColumnInterface, TaskInterface } from '../../types';
import { deleteColumn, deleteTask } from '../../redux/reducers/board/ActionsBoard';
import { updateColumnsData } from '../../redux/reducers/board/boardStateSlice';
import { useNavigate } from 'react-router';
import { findIndex, cloneDeep } from 'lodash';
import { deleteUser } from '../UserEditForm/UserEditAction';
import { logoutUser } from '../../redux/user/actions';
import { useContext } from 'react';
import { ToastContext } from '../../contexts/ToastContext';

function ConfirmDeleteModalWindow({ id, title, type }: ConfirmDeleteModalWindowProps): JSX.Element {
  const boardsData = useAppSelector((state) => state.boardsReducer.boardsData);
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const { dispatch: toastDispatch } = useContext(ToastContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitDeleteHandler = async () => {
    switch (type) {
      case 'board':
        deleteBoard(id);
        const boards: BoardInterface[] = boardsData.filter((board) => board.id !== id);
        dispatch(updateBoardsData(boards));
        break;
      case 'column':
        const columns: ColumnInterface[] = boardData.columns.filter((column) => column.id !== id);
        dispatch(deleteColumn({ title, columnId: id, boardId: boardData.id, navigate }));
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
        dispatch(deleteTask({ title, columnId, boardId: boardData.id, taskId: id, navigate }));
        const tasks: TaskInterface[] = boardData.columns[columnIndex].tasks.filter(
          (task) => task.id !== id
        );
        const newColumns = cloneDeep(boardData.columns);
        newColumns[columnIndex].tasks = tasks;
        dispatch(updateColumnsData(newColumns));
        break;
      case 'user':
        const res = await deleteUser(id);
        if (res === 204) {
          toastDispatch({ type: 'SUCCESS', payload: 'User has been deleted successfully' });
          navigate('/');
          dispatch(logoutUser());
        } else {
          toastDispatch({ type: 'ERROR', payload: 'User was not found, delete fail' });
        }
    }
  };
  return (
    <div>
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {`Are you sure you want to delete this ${type} '${title}'?`}
            </h3>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={submitDeleteHandler}
            >
              Yes, Im sure
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModalWindow;
