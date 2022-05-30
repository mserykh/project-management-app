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
import user_image from '../../assets/images/user_image.svg';
import { useTranslation } from 'react-i18next';

type CreateUpdateTaskFormData = {
  taskTitle: string;
  taskDescription: string;
  files?: FileInterface[];
  userOption: UserOption;
};

type UserOption = { value: string; label: string };

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
  const users = useAppSelector((state) => state.boardReducer.users);
  const currentUserId = useAppSelector((state) => state.userReducer.user?.id);
  const usersOptions = users.map((user) => ({
    value: user.id,
    label: user.login,
  })) as unknown as UserOption[];
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [editMode, setEditMode] = useState<boolean>(false);

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
      userId: get(data, 'userOption.value'),
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
      copyColumns[columnIndex].tasks[taskIndex].userId = get(data, 'userOption.value');
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

  const isUpdate = () => !!id;
  const isSubmitDisabled = (!isDirty && !isUpdate()) || Object.keys(errors).length > 0;

  const fieldLabel = isUpdate() ? `${t('_LBL_UPDATE_TASK_')} ${title}` : t('_LBL_ADD_TASK_');
  const buttonName = isUpdate() ? t('_BTN_UPDATE_TASK_') : t('_BTN_ADD_TASK_');

  const formEditMode = (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
      <h1 className="form__title">{fieldLabel}</h1>
      <FormElement
        type="text"
        label={`${t('_LBL_TITLE_')} *`}
        labelColor={'black'}
        placeholder={t('_LBL_TASK_TITLE_PLACEHOLDER_')}
        errorText={t('_ERR_TITLE_LENGTH_')}
        hasError={!!errors?.taskTitle}
        inputData={register('taskTitle', {
          required: true,
          minLength: 1,
          value: title ? title : '',
        })}
        labelClassName=""
      />
      <FormElement
        type="textarea"
        label={`${t('_LBL_DESC_')} *`}
        labelColor={'black'}
        placeholder={t('_LBL_TASK_DESC_PLACEHOLDER_')}
        errorText={t('_ERR_DESC_LENGTH_10_')}
        hasError={!!errors?.taskDescription}
        inputData={register('taskDescription', {
          required: true,
          minLength: 10,
          value: description ? description : '',
        })}
        labelClassName=""
      />
      <div>
        <Controller
          name="userOption"
          control={control}
          defaultValue={usersOptions.find((o) => o.value === (userId || currentUserId))}
          render={({ field }) => {
            return (
              <Select
                placeholder={t('_LBL_USER_SELECT_')}
                options={usersOptions}
                onChange={field.onChange}
                value={field.value}
              />
            );
          }}
        ></Controller>
      </div>
      <Button
        className={`button--add${
          isSubmitDisabled ? ' bg-gray' : ' bg-primaryGreen hover:opacity-70'
        }`}
        type="submit"
        isDisabled={isSubmitDisabled}
      >
        {buttonName}
      </Button>
    </form>
  );

  const formReadMode = (
    <div className="flex justify-between items-start">
      <div className="task-modal__content-wrapper">
        <h3 className="task-modal__title">{title}</h3>
        <p className="task-modal__description">{description}</p>
        <div className="task-modal__assignee-wrapper">
          <h5 className="text-primaryGreen task-modal__username-label">{t('_LBL_ASSIGNEE_')}</h5>
          <div className="task-modal__username-wrapper">
            {userId && <img src={user_image} alt="" />}
            <p className="task-modal__username">{userId ? userName(userId) : 'No assignee'}</p>
          </div>
        </div>
      </div>
      <button onClick={() => setEditMode(true)}>
        <img src={card_edit} />
        <span className="sr-only">Edit task</span>
      </button>
    </div>
  );

  return editMode || !readOnly ? formEditMode : formReadMode;
};

export default CreateUpdateTaskForm;
