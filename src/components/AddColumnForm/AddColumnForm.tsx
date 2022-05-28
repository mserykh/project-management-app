import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import FormElement from '../FormElements/FormElement';
import { createColumn } from '../../redux/reducers/board/ActionsBoard';
import { useTranslation } from 'react-i18next';

export type AddColumnFormData = {
  columnTitle: string;
};

interface AddColumnFormProps {
  id: string;
  onClose: () => void;
}

const AddColumnForm = ({ onClose, id }: AddColumnFormProps) => {
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const dispatch = useAppDispatch();
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
        boardId: id,
        title: data.columnTitle,
        columns: boardData.columns,
      })
    );
    reset();
    onClose();
  };

  const { t } = useTranslation();

  const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
      <FormElement
        type="text"
        label={t('_LBL_ADD_COLUMN_TITLE_')}
        labelColor={'black'}
        placeholder={t('_LBL_COLUMN_TITLE_PLACEHOLDER_')}
        errorText={t('_ERR_TITLE_LENGTH_')}
        hasError={!!errors?.columnTitle}
        inputData={register('columnTitle', {
          required: true,
          minLength: 1,
        })}
        labelClassName="inline-block text-base text-black float-left mb-3 font-semibold"
      />
      <Button
        className={`button--add${
          isSubmitDisabled ? ' bg-gray' : ' bg-primaryGreen hover:opacity-70'
        }`}
        type="submit"
        isDisabled={isSubmitDisabled}
      >
        {t('_BTN_ADD_COLUMN_')}
      </Button>
    </form>
  );
};

export default AddColumnForm;
