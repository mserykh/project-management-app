import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ColumnCard from '../../components/ColumnCard/ColumnCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchBoard } from '../../redux/reducers/board/ActionsBoard';
import { createColumn } from '../../redux/reducers/column/ActionsColumn';
import { ColumnInterface } from '../../types';

function BoardDetailPage(): JSX.Element {
  const urlParams = useParams();
  const id = urlParams.id || '';
  // check if there is any columns => render
  // check if there is any tasks => render
  const dispatch = useAppDispatch();
  const { boardData } = useAppSelector((state) => state.boardReducer);

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, boardData.columns]);

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
          onClick={() => {
            dispatch(createColumn({ id: id, title: '18 column', order: 18 }));
          }}
          isDisabled={false}
        >
          Add column
        </Button>
      </section>
    </section>
  );
}

export default BoardDetailPage;
