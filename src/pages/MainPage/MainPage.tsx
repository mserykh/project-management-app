import BoardCard from '../../components/BoardCard/BoardCard';
import Loader from '../../components/Loader/Loader';
import BoardCardProps from '../../components/BoardCard/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { fetchAllBoards } from '../../redux/reducers/boards/ActionsBoards';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { boardsData, loading } = useAppSelector((state) => state.boardsReducer);
  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);
  return (
    <main className="container mx-auto">
      {loading ? (
        <Loader text="Boards are loading..." />
      ) : (
        <section className="py-6 flex flex-col gap-4">
          <header className="flex flex-wrap gap-y-4 justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="section__title">Boards</h2>
              <p className="caption px-3 py-1 bg-off-white rounded-full">
                {boardsData && boardsData.length}
              </p>
            </div>
            <input className="inline-block" type="text" placeholder="Enter text here"></input>
          </header>
          <ul className="boards-list">
            {boardsData &&
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
              })}
          </ul>
        </section>
      )}
    </main>
  );
}

export default MainPage;
