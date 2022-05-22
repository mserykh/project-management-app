import { Controller, useForm } from 'react-hook-form';
import { FileInterface, UserInterface, TaskInterface, ColumnInterface } from '../../types';
import Button from '../Button/Button';
import FormElement from '../FormElements/FormElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { cloneDeep, findIndex } from 'lodash';
import { createTask, updateTask } from '../../redux/actions/task';
import { get } from 'lodash';
import Select from 'react-select';
import { updateColumnsData } from '../../redux/reducers/board/boardStateSlice';
import { getNewOrderNumber } from '../../utils';
import card_edit from '../../assets/images/card_edit.svg';
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
  readOnly?: boolean;
  userId?: string;
  order?: number;
}

const CreateUpdateTaskForm = ({
  onClose,
  title,
  id,
  description,
  boardId,
  columnId,
  userId,
  readOnly,
}: CreateUpdateTaskFormProps) => {
  const isUpdate = () => !!id;
  const users = useAppSelector((state) => state.boardReducer.users);
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const [editMode, setEditMode] = useState<boolean>(false);
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
    const columnIndex = boardData.columns.findIndex(
      (column: ColumnInterface) => column.id === columnId
    );
    const copyColumns = cloneDeep(boardData.columns);
    const taskData: TaskInterface = {
      title: data.taskTitle,
      description: data.taskDescription,
      userId: get(data, 'userId.id'),
      done: false,
      order: getNewOrderNumber(boardData.columns[columnIndex].tasks),
    };
    if (!!id) {
      taskData.boardId = boardId;
      taskData.columnId = columnId;
      await updateTask(taskData, boardId, columnId, id);
      const taskIndex = findIndex(copyColumns[columnIndex].tasks, (task) => task.id === id);
      copyColumns[columnIndex].tasks[taskIndex].description = taskData.description;
      copyColumns[columnIndex].tasks[taskIndex].title = taskData.title;
      copyColumns[columnIndex].tasks[taskIndex].userId = get(data, 'userId.id');
    } else {
      const newTaskData = await createTask(taskData, boardId, columnId);
      const newTask = (newTaskData as unknown as Record<string, unknown>).data;
      copyColumns[columnIndex].tasks.push(newTask as unknown as TaskInterface);
    }
    dispatch(updateColumnsData(copyColumns));
    reset();
    onClose();
  };
  const userName = (userId: string) => {
    if (userId) {
      const userIndex = findIndex(users, (user: UserInterface) => user.id === userId);
      return get(users[userIndex], 'login', 'None');
    }
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
        containerClassName="w-full m-0 float-left  mb-[25px]"
        inputClassName="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
        labelClassName="inline-block text-base text-[black] float-left mb-[12px] font-semibold"
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
        containerClassName="w-full m-0 float-left  mb-[25px]"
        inputClassName="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
        labelClassName="inline-block text-base text-[black] float-left mb-[12px] font-semibold"
      />
      <div>
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <Select<UserInterface>
              placeholder="Please select an user"
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
  const formReadMode = (
    <div className="flex">
      <div>
        <div>
          <label htmlFor="task_title">Task title:</label>
          <h3 id="task_title">{title}</h3>
        </div>
        <div>
          <label htmlFor="task_title">Task Description:</label>
          <p id="task_description">{description}</p>
        </div>
        <div>
          <label htmlFor="task_user">User:</label>
          <h5>{userId ? userName(userId) : ''}</h5>
        </div>
      </div>
      <div>
        <img src={card_edit} onClick={() => setEditMode(true)}></img>
      </div>
    </div>
  );

  return editMode || !readOnly ? formEditMode : formReadMode;
};

export default CreateUpdateTaskForm;
