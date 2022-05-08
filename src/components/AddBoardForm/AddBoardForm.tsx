import { useForm } from 'react-hook-form';
import createBoard from '../../redux/actions/board';
import Button from '../Button/Button';
import FormElement from '../FormElements/FormElement';

type AddBoardFormData = {
  boardTitle: string;
};

interface AddBoardFormProps {
  onClose: () => void;
}

const AddBoardForm = ({ onClose }: AddBoardFormProps) => {
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
    createBoard(data.boardTitle);
    reset();
    onClose();
  };

  const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <FormElement
        type="text"
        label="Add board title"
        labelColor={'black'}
        placeholder="Please enter the board title"
        errorText={'The title should contain at least 1 character'}
        hasError={!!errors?.boardTitle}
        inputData={register('boardTitle', {
          required: true,
          minLength: 1,
        })}
      />
      <Button
        className={`text-white font-bold py-2 px-4 rounded-full${
          isSubmitDisabled ? ' bg-gray-300' : ' bg-blue-500 hover:bg-blue-700'
        }`}
        type="submit"
        isDisabled={isSubmitDisabled}
      >
        Create board
      </Button>
    </form>
  );
};

export default AddBoardForm;
