import BoardCard from '../../components/BoardCard/BoardCard';
import BoardCardProps from '../../components/BoardCard/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { fetchAllBoards } from '../../redux/reducers/boards/ActionsBoards';
import { useTranslation } from 'react-i18next';

function MainPage(): JSX.Element {
  const { boardsData } = useAppSelector((state) => state.boardsReducer);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  return (
    <main className="container mx-auto">
      <section className="py-6 flex flex-col gap-4">
        <header className="flex flex-wrap gap-y-4 justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="section__title">{t('_LBL_BOARDS_')}</h2>
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
    </main>
  );
}

export default MainPage;
