import { Controller, useForm } from 'react-hook-form';
import { BoardInterface, FileInterface, UserInterface, TaskInterface } from '../../types';
import Button from '../Button/Button';
import FormElement from '../FormElements/FormElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateBoardsData } from '../../redux/reducers/boards/boardsStateSlice';
import { cloneDeep } from 'lodash';
import AsyncSelect from 'react-select/async';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { BACKEND_URL, USERS_ENDPOINT } from '../../redux/constants';
import { useNavigate } from 'react-router';
import { createTask, updateTask } from '../../redux/actions/task';
import { get } from 'lodash';

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
}

const CreateUpdateTaskForm = ({
  onClose,
  title,
  id,
  description,
  files,
  boardId,
  columnId,
}: CreateUpdateTaskFormProps) => {
  const userId = useAppSelector((state) => {
    return state.userReducer.user?.id;
  });
  const isUpdate = () => !!id;
  const boardsData = useAppSelector((state) => state.boardsReducer.boardsData);
  const dispatch = useAppDispatch();
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState<UserInterface | null>(null);
  const navigate = useNavigate();
  // handle input change event
  const handleInputChange = (value: string) => {
    setValue(value);
  };

  const loadSelectOptions = async () => {
    const token = localStorage.getItem('token') || '';
    try {
      const response = await axios.get(`${BACKEND_URL}/${USERS_ENDPOINT}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      return data;
    } catch (e) {
      return (e as AxiosError).message;
    }
  };
  const selectGetOptionLabel = (e: UserInterface) => e.login;
  const selectGetOptionValue = (e: UserInterface) => e.id;
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

  const formSubmitHandler = (data: CreateUpdateTaskFormData): void => {
    debugger;
    const taskData: TaskInterface = {
      title: data.taskTitle,
      description: data.taskDescription,
      userId: get(data, 'userId.id') || userId,
      done: false,
      order: 1,
      boardId: boardId,
      columnId: columnId,
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
    createTask(taskData, boardId, columnId);
    reset();
    onClose();
  };

  const isSubmitDisabled = (!isDirty && !isUpdate()) || Object.keys(errors).length > 0;
  const fieldLabel = isUpdate() ? `Update task ${title}` : 'Add new task';
  const buttonName = isUpdate() ? 'Update task' : 'Add new task';
  return (
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
            <AsyncSelect
              cacheOptions
              defaultOptions
              value={selectedValue}
              onChange={(value) => {
                debugger;
                return setSelectedValue(value);
              }}
              placeholder={'Please choose an user'}
              loadOptions={loadSelectOptions}
              onInputChange={handleInputChange}
              getOptionLabel={selectGetOptionLabel}
              getOptionValue={selectGetOptionValue}
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
};

export default CreateUpdateTaskForm;
