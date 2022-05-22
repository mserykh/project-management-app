import BoardCard from '../../components/BoardCard/BoardCard';
import BoardCardProps from '../../components/BoardCard/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { fetchAllBoards } from '../../redux/reducers/boards/ActionsBoards';
import Spinner from '../../components/Spinner/Spinner';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { boardsData, loading } = useAppSelector((state) => state.boardsReducer);
  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  const boardsContent =
    boardsData &&
    boardsData.map((el: BoardCardProps): JSX.Element => {
      return (
        <BoardCard
          id={el.id}
          key={el.id}
          title={el.title}
          columnsCount={el.columnsCount}
          tasksCount={el.tasksCount}
          description={el.description}
          files={el.files}
        />
      );
    });

  const pageContent = loading ? <Spinner text="Boards are loading" /> : boardsContent;

  return (
    <div className="container mx-auto">
      <div className="container mx-auto mx-4 my-4 py10 align-center">
        <div className="flex justify-between">
          <h2 className="font-['Nunito'] not-italic font-black text-[48px] leading-[120%] mx-20">
            Boards
          </h2>
          <input className="inline-block" type="text" placeholder="Enter text here" />
        </div>
        <div className="container mx-auto grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {pageContent}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
