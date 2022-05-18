import { Controller, useForm } from 'react-hook-form';
import { BoardInterface, FileInterface, UserInterface, TaskInterface } from '../../types';
import Button from '../Button/Button';
import FormElement from '../FormElements/FormElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateBoardsData } from '../../redux/reducers/boards/boardsStateSlice';
import { cloneDeep } from 'lodash';
import { createTask, updateTask } from '../../redux/actions/task';
import { get } from 'lodash';
import Select from 'react-select';
import { updateColumnsData } from '../../redux/reducers/board/boardStateSlice';
import AxiosResponse from 'axios';
import { useState } from 'react';

type CreateUpdateTaskFormData = {
  taskTitle: string;
  taskDescription: string;
  files?: FileInterface[];
  userId?: string;
};

interface CreateUpdateTaskFormProps {
  title?: string;
  id?: string;
  description?: string;
  files?: FileInterface[];
  onClose: () => void;
  boardId: string;
  columnId: string;
  editMode: boolean;
}

const CreateUpdateTaskForm = ({
  onClose,
  title,
  id,
  description,
  files,
  boardId,
  columnId,
  editMode,
}: CreateUpdateTaskFormProps) => {
  const userId = useAppSelector((state) => {
    return state.userReducer.user?.id;
  });
  const isUpdate = () => !!id;
  const boardsData = useAppSelector((state) => state.boardsReducer.boardsData);
  const users = useAppSelector((state) => state.boardReducer.users);
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const dispatch = useAppDispatch();
  const {
    register,
    reset,
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<CreateUpdateTaskFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const formSubmitHandler = async (data: CreateUpdateTaskFormData): Promise<void> => {
    const taskData: TaskInterface = {
      title: data.taskTitle,
      description: data.taskDescription,
      userId: get(data, 'userId.id') || userId,
      done: false,
      order: 1,
    };
    if (!!id) {
      updateTask(taskData, boardId, columnId, id);
      const newBoards = cloneDeep(boardsData);
      const boards: BoardInterface[] = newBoards.map((board) => {
        if (board.id === id) {
          board['title'] = data.taskTitle;
        }
        return board;
      });
      dispatch(updateBoardsData(boards));
      reset();
      onClose();
      return;
    }
    const newTaskData = await createTask(taskData, boardId, columnId);
    const newTask = (newTaskData as unknown as Record<string, unknown>).data;
    const columnIndex = boardData.columns.findIndex((column) => column.id === columnId);
    const copyColumns = cloneDeep(boardData.columns);
    copyColumns[columnIndex].tasks.push(newTask as unknown as TaskInterface);
    dispatch(updateColumnsData(copyColumns));
    reset();
    onClose();
  };

  const isSubmitDisabled = (!isDirty && !isUpdate()) || Object.keys(errors).length > 0;
  const fieldLabel = isUpdate() ? `Update task ${title}` : 'Add new task';
  const buttonName = isUpdate() ? 'Update task' : 'Add new task';
  const formEditMode = (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <h1 className="font-['Inter'] not-italic font-black text-[20px] leading-[140%]">
        {fieldLabel}
      </h1>
      <FormElement
        type="text"
        label="Title *"
        labelColor={'black'}
        placeholder="Please enter the task title"
        errorText={'The title should contain at least 1 character'}
        hasError={!!errors?.taskTitle}
        inputData={register('taskTitle', {
          required: true,
          minLength: 1,
          value: title ? title : '',
        })}
      />
      <FormElement
        type="textarea"
        label="Description *"
        labelColor={'black'}
        placeholder="Please enter the task description"
        errorText={'The description should contain at least 20 characters'}
        hasError={!!errors?.taskDescription}
        inputData={register('taskDescription', {
          required: true,
          minLength: 10,
          value: description ? description : '',
        })}
      />
      <div>
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <Select<UserInterface>
              options={users}
              getOptionLabel={(user: UserInterface) => user.login}
              getOptionValue={(user: UserInterface) => user.id}
              onChange={field.onChange}
            />
          )}
        ></Controller>
      </div>
      <Button
        className={`text-white font-bold py-2 px-4 rounded-full${
          isSubmitDisabled ? ' bg-gray-300' : ' bg-blue-500 hover:bg-blue-700'
        }`}
        type="submit"
        isDisabled={isSubmitDisabled}
      >
        {buttonName}
      </Button>
    </form>
  );

  return editMode ? formEditMode : <></>;
};

export default CreateUpdateTaskForm;
