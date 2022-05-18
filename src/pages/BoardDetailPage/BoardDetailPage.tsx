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
    <DndProvider debugMode={true} backend={HTML5Backend}>
      <section className="grid grid-rows-columns gap-2 mx-auto pb-2 h-columns">
        <header className={'flex justify-between items-start max-w-[1440px] w-full mx-auto'}>
          <div>
            <h2>{boardData.title}</h2>
            <p>{boardData.description}</p>
          </div>
          <Button
            className="whitespace-nowrap justify-self-start w-max h-max bg-gray-200 hover:bg-gray-400 text-white font-bold py-2 px-4 text-black rounded-full rounded-tr"
            type="button"
            onClick={() => {
              navigate('/main');
            }}
            isDisabled={false}
          >
            Go to boards list
          </Button>
        </header>
        <section className="flex gap-4 w-full overflow-x-auto justify-stretch">
          <ul className="grid grid-flow-col gap-4">{columnsRender}</ul>
          <Button
            className="whitespace-nowrap justify-self-start w-72 h-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full rounded-tr"
            type="button"
            onClick={() => {
              setIsModalOpened(true);
            }}
            isDisabled={false}
          >
            Add column
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
