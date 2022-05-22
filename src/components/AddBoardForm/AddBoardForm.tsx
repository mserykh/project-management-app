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
  title?: string;
  id?: string;
  description?: string;
  onClose: () => void;
}

const AddBoardForm = ({ onClose, title, id }: AddBoardFormProps) => {
  const boardsData = useAppSelector((state) => state.boardsReducer.boardsData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const isSubmitDisabled = (!isDirty && !title) || Object.keys(errors).length > 0;
  const fieldLabel = title ? 'Update board title' : 'Add board title';
  const buttonName = title ? 'Update board' : 'Create board';
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
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
        containerClassName="w-full m-0 float-left  mb-[25px]"
        inputClassName="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
        labelClassName="inline-block text-base text-[black] float-left mb-[12px] font-semibold"
      />
      <Button
        className={`button--add${
          isSubmitDisabled ? ' bg-gray-300' : ' bg-emerald-400 hover:bg-emerald-600'
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
