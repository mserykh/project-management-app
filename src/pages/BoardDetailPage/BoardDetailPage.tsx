import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddColumnForm from '../../components/AddColumnForm/AddColumnForm';
import Button from '../../components/Button/Button';
import ColumnCard from '../../components/ColumnCard/ColumnCard';
import Modal from '../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createColumn, fetchBoard } from '../../redux/reducers/board/ActionsBoard';
import { updateBoardData } from '../../redux/reducers/board/boardStateSlice';
import { ColumnInterface } from '../../types';

function BoardDetailPage(): JSX.Element {
  const urlParams = useParams();
  const navigate = useNavigate();

  if (!urlParams.id) {
    toast.error(`This board does not exist or something went wrong`);
    navigate('/404');
  }
  const id = urlParams.id as string;

  const dispatch = useAppDispatch();
  const { boardData } = useAppSelector((state) => state.boardReducer);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleOnClose = (): void => {
    setIsModalOpened(false);
  };

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id]);

  const columns = boardData.columns as ColumnInterface[];
  const columnsRender = columns.map((el: ColumnInterface) => (
    <ColumnCard key={el.id} id={el.id} title={el.title} />
  ));

  return (
    <section className="max-w-[1440px] mx-auto mb-auto">
      <header>
        <h2>{boardData.title} board</h2>
      </header>
      <section className="flex gap-6 w-full overflow-x-auto">
        <ul className="grid grid-flow-col gap-6 content-start">{columnsRender}</ul>
        <Button
          className="whitespace-nowrap justify-self-start w-max h-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full rounded-tr"
          type="button"
          onClick={() => setIsModalOpened(true)}
          isDisabled={false}
        >
          Add column
        </Button>
        <Modal isOpened={isModalOpened} onClose={handleOnClose}>
          <AddColumnForm onClose={handleOnClose} id={id} />
        </Modal>
      </section>
    </section>
  );
}

export default BoardDetailPage;
