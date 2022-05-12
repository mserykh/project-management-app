import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import FormElement from '../FormElements/FormElement';
import { createColumn, fetchBoard } from '../../redux/reducers/board/ActionsBoard';
import { updateBoardData } from '../../redux/reducers/board/boardStateSlice';

type AddColumnFormData = {
  columnTitle: string;
};

interface AddColumnFormProps {
  id: string;
  onClose: () => void;
}

const AddColumnForm = ({ onClose, id }: AddColumnFormProps) => {
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<AddColumnFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const formSubmitHandler = (data: AddColumnFormData): void => {
    dispatch(
      createColumn({
        boardID: id,
        title: data.columnTitle,
        columns: boardData.columns,
        navigate: navigate,
      })
    );
    dispatch(fetchBoard(id));
    reset();
    onClose();
  };

  const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;
  return (
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
        })}
      />
      <Button
        className={`ml-auto whitespace-nowrap text-white font-bold py-2 px-4 rounded-full rounded-tr${
          isSubmitDisabled ? ' bg-gray-300' : ' bg-emerald-400 hover:bg-emerald-600'
        }`}
        type="submit"
        isDisabled={isSubmitDisabled}
      >
        Add column
      </Button>
    </form>
  );
};

export default AddColumnForm;
