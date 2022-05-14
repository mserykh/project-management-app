import card_delete from '../../assets/images/card_delete.svg';
import Modal from '../Modal/Modal';
import ColumnCardProps from './types';
import { useState } from 'react';
import ConfirmDeleteModalWindow from '../ConfirmDeleteModalWindow/ConfirmDeleteModalWindow';
import FormElement from '../FormElements/FormElement';
import { useForm } from 'react-hook-form';
import { AddColumnFormData } from '../AddColumnForm/AddColumnForm';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router';
import { updateColumn } from '../../redux/reducers/board/ActionsBoard';

function ColumnCard({ id, title, order }: ColumnCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.boardReducer.boardData);
  const navigate = useNavigate();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

  const handleDeleteModalOnClose = (): void => {
    setIsDeleteModalOpened(false);
  };

  const {
    register,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<AddColumnFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });
  const isSubmitDisabled = !isDirty || Object.keys(errors).length > 0;

  const handleUpdateColumnTitle = () => {};

  const formSubmitHandler = (data: AddColumnFormData): void => {
    dispatch(
      updateColumn({
        title: data.columnTitle,
        columnId: id,
        boardId: boardData.id,
        order: order,
        navigate: navigate,
      })
    );
    reset();
    //onClose();
  };

  return (
    <>
      <li key={id} className="w-96 bg-purple-100 rounded-3xl p-6 h-96">
        <div className="" onClick={handleUpdateColumnTitle}>
          <h3 className="w-[260px] h-[80px] font-['Inter'] not-italic text-[32px] leading-[125%] my-6 mx-6">
            {title}
          </h3>
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
                value: title || '',
              })}
            />
            <Button
              className={`ml-auto whitespace-nowrap text-white font-bold py-2 px-4 rounded-full rounded-tr${
                isSubmitDisabled ? ' bg-gray-300' : ' bg-emerald-400 hover:bg-emerald-600'
              }`}
              type="submit"
              isDisabled={isSubmitDisabled}
            >
              Ok
            </Button>
            <Button
              className={`ml-auto whitespace-nowrap text-white font-bold py-2 px-4 rounded-full rounded-tr bg-gray-200 hover:bg-gray-400'
              }`}
              type="button"
              isDisabled={isSubmitDisabled}
            >
              Cancel
            </Button>
          </form>
        </div>
        <div className="w-[44px] flex justify-between my-6">
          <img
            className="inline-block mx-6 "
            src={card_delete}
            onClick={() => setIsDeleteModalOpened(true)}
          ></img>
        </div>
      </li>
      <Modal isOpened={isDeleteModalOpened} onClose={handleDeleteModalOnClose}>
        <ConfirmDeleteModalWindow title={title} type="column" id={id} />
      </Modal>
    </>
  );
}

export default ColumnCard;
