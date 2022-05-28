import { useForm } from 'react-hook-form';
import { updateBoard } from '../../redux/actions/board';
import { BoardInterface } from '../../types';
import Button from '../Button/Button';
import FormElement from '../FormElements/FormElement';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateBoardsData } from '../../redux/reducers/boards/boardsStateSlice';
import { cloneDeep } from 'lodash';
import { createBoard } from '../../redux/reducers/boards/ActionsBoards';
import { useTranslation } from 'react-i18next';

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

  const formSubmitHandler = (data: AddBoardFormData): void => {
    if (title && id) {
      updateBoard(dispatch, data.boardTitle, data.boardDescription, id);
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
    dispatch(createBoard({ title: data.boardTitle, description: data.boardDescription }));
    reset();
    onClose();
  };

  const isSubmitDisabled = (!isDirty && !title) || Object.keys(errors).length > 0;

  const { t } = useTranslation();

  const titleLabel = title ? t('_LBL_UPDATE_BOARD_TITLE_') : t('_LBL_ADD_BOARD_TITLE_');
  const descriptionLabel = description ? t('_LBL_UPDATE_BOARD_DESC_') : t('_LBL_ADD_BOARD_DESC_');
  const buttonName = title ? t('_BTN_UPDATE_BOARD_') : t('_BTN_ADD_BOARD_');
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="form">
      <FormElement
        type="text"
        label={titleLabel}
        labelColor={'black'}
        placeholder={t('_LBL_BOARD_TITLE_PLACEHOLDER_')}
        errorText={t('_ERR_TITLE_LENGTH_')}
        hasError={!!errors?.boardTitle}
        inputData={register('boardTitle', {
          required: true,
          minLength: 1,
          value: title ? title : '',
        })}
        labelClassName=""
      />
      <FormElement
        type="textarea"
        label={descriptionLabel}
        labelColor={'black'}
        placeholder={t('_LBL_BOARD_DESC_PLACEHOLDER_')}
        errorText={t('_ERR_DESC_LENGTH_')}
        hasError={!!errors?.boardDescription}
        inputData={register('boardDescription', {
          required: true,
          minLength: 1,
          value: description ? description : '',
        })}
        labelClassName=""
      />
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
};

export default AddBoardForm;
