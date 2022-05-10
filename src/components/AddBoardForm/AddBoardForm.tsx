import { useForm } from 'react-hook-form';
import { createBoard, updateBoard } from '../../redux/actions/board';
import { BoardInterface } from '../../types';
import Button from '../Button/Button';
import FormElement from '../FormElements/FormElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import boardsStateSlice from '../../redux/reducers/boards/boardsStateSlice';
import { cloneDeep } from 'lodash';

type AddBoardFormData = {
  boardTitle: string;
};

interface AddBoardFormProps {
  title?: string;
  id?: string;
  onClose: () => void;
}

const AddBoardForm = ({ onClose, title, id }: AddBoardFormProps) => {
  const { boardsData } = useAppSelector((state) => state.boardsReducer);
  const { updateBoardsData } = boardsStateSlice.actions;
  const dispatch = useAppDispatch();
  const {
    register,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<AddBoardFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const formSubmitHandler = (data: AddBoardFormData): void => {
    if (title && id) {
      updateBoard(data.boardTitle, id);
      const newBoards = cloneDeep(boardsData);
      const boards: BoardInterface[] = newBoards.map((board) => {
        if (board.id === id) {
          board['title'] = data.boardTitle;
        }
        return board;
      });
      dispatch(updateBoardsData(boards));
      reset();
      onClose();
      return;
    }
    createBoard(data.boardTitle);
    reset();
    onClose();
  };

  const isSubmitDisabled = (!isDirty && !title) || Object.keys(errors).length > 0;
  const fieldLabel = title ? 'Update board title' : 'Add board title';
  const buttonName = title ? 'Update board' : 'Create board';
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <FormElement
        type="text"
        label={fieldLabel}
        labelColor={'black'}
        placeholder="Please enter the board title"
        errorText={'The title should contain at least 1 character'}
        hasError={!!errors?.boardTitle}
        inputData={register('boardTitle', {
          required: true,
          minLength: 1,
          value: title ? title : '',
        })}
      />
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

export default AddBoardForm;
