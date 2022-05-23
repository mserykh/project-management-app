import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddColumnForm from '../../components/AddColumnForm/AddColumnForm';
import Button from '../../components/Button/Button';
import ColumnCard from '../../components/ColumnCard/ColumnCard';
import Modal from '../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBoard, getAllUsers } from '../../redux/reducers/board/ActionsBoard';
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
    dispatch(getAllUsers());
  }, [dispatch, id]);

  const columns = boardData.columns as ColumnInterface[];
  const columnsRender = [...columns]
    .sort((a, b) => a.order - b.order)
    .map((el: ColumnInterface) => (
      <ColumnCard key={el.id} id={el.id} title={el.title} boardId={id} order={el.order} />
    ));

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="p-3 sm:p-6 grid grid-rows-columns gap-x-2 gap-y-6 mx-auto h-columns">
        <header className="section__header section__header--columns">
          <div className="section__header-inner">
            <h2 className="section__title">{boardData.title}</h2>
            <p className="section__description">{boardData.description}</p>
          </div>
          <Button
            className="button--back"
            type="button"
            onClick={() => {
              navigate('/main');
            }}
            isDisabled={false}
          >
            Go to boards list
          </Button>
        </header>
        <section className="columns-list">
          <ul className="grid grid-flow-col gap-4">{columnsRender}</ul>
          <Button
            className="button button--column"
            type="button"
            onClick={() => {
              setIsModalOpened(true);
            }}
            isDisabled={false}
          >
            Add a column
          </Button>
          <Modal isOpened={isModalOpened} onClose={handleOnClose}>
            <AddColumnForm onClose={handleOnClose} id={id} />
          </Modal>
        </section>
      </section>
    </DndProvider>
  );
}

export default BoardDetailPage;
