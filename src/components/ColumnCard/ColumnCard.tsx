import card_delete from '../../assets/images/card_delete.svg';
import task_add from '../../assets/images/task_add.svg';
import Modal from '../Modal/Modal';
import ColumnCardProps from './types';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import { useForm } from 'react-hook-form';
import { AddColumnFormData } from '../AddColumnForm/AddColumnForm';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router';
import { updateColumn } from '../../redux/reducers/board/ActionsBoard';
import CreateUpdateTaskForm from '../CreateUpdateTaskForm/CreateUpdateTaskForm';
import { findIndex } from 'lodash';
import { ColumnInterface, TaskInterface } from '../../types';
import TaskCard from '../TaskCard/TaskCard';
import FormElement from '../FormElements/FormElement';

function ColumnCard({ id, title, order, boardId }: ColumnCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const navigate = useNavigate();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
  const [isUpdateInputOpened, setIsUpdateInputOpened] = useState<boolean>(false);
  const [isAddTaskModalOpened, setIsAddTaskModalOpened] = useState<boolean>(false);
  const { tasks } = useAppSelector((state) => {
    const columnIndex = findIndex(
      state.boardReducer.boardData.columns,
      (column: ColumnInterface) => column.id === id
    );
    return state.boardReducer.boardData.columns[columnIndex];
  });
  const tasksRender = tasks.map((el: TaskInterface) => (
    <TaskCard
      key={el.id}
      id={el.id as string}
      title={el.title}
      boardId={boardId}
      userId={el.userId}
      description={el.description}
      columnId={id}
    />
  ));

  const handleDeleteModalOnClose = (): void => {
    setIsDeleteModalOpened(false);
  };
  const handleAddTaskModalOnClose = (): void => {
    setIsAddTaskModalOpened(false);
  };

  const {
    register,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<AddColumnFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;

  const handleUpdateColumnTitle = (): void => {
    setIsUpdateInputOpened((prevValue) => !prevValue);
  };

  const handleCancel = (): void => {
    handleUpdateColumnTitle();
    reset();
  };

  const formSubmitHandler = (data: AddColumnFormData): void => {
    if (data.columnTitle !== title) {
      dispatch(
        updateColumn({
          title: data.columnTitle,
          columnId: id,
          boardId: boardData.id,
          order: order,
          navigate: navigate,
        })
      );
    }
    reset();
    handleUpdateColumnTitle();
  };

  return (
    <>
      <li key={id} className="overflow-auto w-96 bg-purple-100 rounded-3xl p-6">
        <div className="">
          {!isUpdateInputOpened && (
            <h3
              onClick={handleUpdateColumnTitle}
              className={`w-[260px] h-[80px] font-['Inter'] not-italic text-[32px] leading-[125%] my-6 mx-6`}
            >
              {title}
            </h3>
          )}
          {isUpdateInputOpened && (
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <FormElement
                type="text"
                label="Add column title"
                labelColor={'black'}
                placeholder="Please enter the column title"
                errorText={'The title should contain at least 1 character'}
                hasError={!!errors?.columnTitle}
                inputData={register('columnTitle', {
                  required: true,
                  minLength: 1,
                  value: title || '',
                })}
              />
              <Button
                className={`ml-auto whitespace-nowrap text-white font-bold py-2 px-4 rounded-full rounded-tr${
                  isSubmitDisabled ? ' bg-gray-300' : ' bg-emerald-400 hover:bg-emerald-600'
                }`}
                type="submit"
                isDisabled={isSubmitDisabled}
              >
                Ok
              </Button>
              <Button
                className={`ml-auto whitespace-nowrap text-white font-bold py-2 px-4 rounded-full rounded-tr bg-gray-200 hover:bg-gray-400`}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </form>
          )}
        </div>
        <div className="w-[44px] flex justify-between my-6">
          <img
            className="inline-block mx-6 "
            src={card_delete}
            onClick={() => setIsDeleteModalOpened(true)}
          ></img>
          <div
            onClick={() => {
              setIsAddTaskModalOpened(true);
            }}
          >
            <img className="inline-block mx-6 " src={task_add}></img>
            <span className="font-['Inter'] not-italic text-[#503ae7] text-[16px] leading-[150%]">
              Add task
            </span>
          </div>
        </div>
        <div>{tasksRender}</div>
      </li>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={title} type="column" id={id} />
      </Modal>
      <Modal isOpened={isAddTaskModalOpened} onClose={handleAddTaskModalOnClose}>
        <CreateUpdateTaskForm
          onClose={handleAddTaskModalOnClose}
          columnId={id}
          boardId={boardId}
          editMode={true}
        />
      </Modal>
    </>
  );
}

export default ColumnCard;
