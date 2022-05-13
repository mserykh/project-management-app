import { useForm } from 'react-hook-form';
import { updateBoard } from '../../redux/actions/board';
import { BoardInterface } from '../../types';
import Button from '../Button/Button';
import FormElement from '../FormElements/FormElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateBoardsData } from '../../redux/reducers/boards/boardsStateSlice';
import { cloneDeep } from 'lodash';
import { useNavigate } from 'react-router';
import { createBoard } from '../../redux/reducers/boards/ActionsBoards';

type AddBoardFormData = {
  boardTitle: string;
  boardDescription: string;
};

interface AddBoardFormProps {
  title: string;
  description: string;
  id: string;
  onClose: () => void;
}

const AddBoardForm = ({ onClose, title, id, description }: AddBoardFormProps) => {
  const boardsData = useAppSelector((state) => state.boardsReducer.boardsData);
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
  const navigate = useNavigate();

  const formSubmitHandler = (data: AddBoardFormData): void => {
    if (title && id) {
      updateBoard(data.boardTitle, data.boardDescription, id);
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
    dispatch(createBoard({ title: data.boardTitle, description: data.boardDescription, navigate }));
    reset();
    onClose();
  };

  const isSubmitDisabled = (!isDirty && !title && !description) || Object.keys(errors).length > 0;
  const titleLabel = title ? 'Update board title' : 'Add board title';
  const descriptionLabel = title ? 'Update board description' : 'Add board description';
  const buttonName = title ? 'Update board' : 'Create board';
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <FormElement
        type="text"
        label={titleLabel}
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
      <FormElement
        type="textarea"
        label={descriptionLabel}
        labelColor={'black'}
        placeholder="Please enter the board description"
        errorText={'The description should contain at least 1 character'}
        hasError={!!errors?.boardDescription}
        inputData={register('boardDescription', {
          required: true,
          minLength: 1,
          value: description ? description : '',
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
