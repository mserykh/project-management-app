import { ActionCreatorWithPayload, AnyAction, AsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { ColumnPayload } from './redux/reducers/board/ActionsBoard';
import { boardStateInterface } from './redux/reducers/board/types';
import { boardsStateInterface } from './redux/reducers/boards/types';
import { globalStateInterface } from './redux/reducers/types';
import { UserState } from './redux/user/userSlice';
import { ColumnInterface, TaskInterface } from './types';

export const getNewOrderNumber = (elementsArray: ColumnInterface[] | TaskInterface[]): number => {
  if (elementsArray.length > 0) {
    const maxOrderNumber = Math.max(...elementsArray.map((element) => element.order as number));
    return maxOrderNumber + 1;
  }
  return 1;
};

export const findColumn = (elementsArray: ColumnInterface[] | TaskInterface[], order: number) => {
  const index: number = elementsArray.findIndex((element) => element.order === order);
  const element = elementsArray[index];
  return {
    index,
    element,
  };
};

export const moveColumn = (
  elementsArray: ColumnInterface[],
  boardId: string,
  dragItemOrder: number,
  hoverItemOrder: number,
  dispatch: ThunkDispatch<
    {
      globalStateReducer: globalStateInterface;
      userReducer: UserState;
      boardsReducer: boardsStateInterface;
      boardReducer: boardStateInterface;
    },
    undefined,
    AnyAction
  > &
    Dispatch,
  updateColumn: AsyncThunk<void, ColumnPayload, Record<string, never>>,
  updateColumnData: ActionCreatorWithPayload<ColumnInterface[], string>
): void => {
  const sortedElements = [...elementsArray].sort((a, b) => a.order - b.order);
  const draggingItem = findColumn(sortedElements, dragItemOrder);
  const updatedDraggingItem = {
    ...draggingItem.element,
    order: getNewOrderNumber(sortedElements),
  } as ColumnInterface;
  dispatch(
    updateColumn({
      title: updatedDraggingItem.title,
      order: updatedDraggingItem.order,
      columnId: updatedDraggingItem.id,
      boardId,
    })
  );
  const hoveredItem = findColumn(sortedElements, hoverItemOrder);
  let newColumns = [] as ColumnInterface[];

  if (hoveredItem.index < draggingItem.index) {
    const changedColumns = [...sortedElements]
      .slice(hoveredItem.index, draggingItem.index)
      .map((item) => {
        return (item = { ...item, order: item.order + 1 });
      });
    changedColumns.forEach((column) =>
      dispatch(
        updateColumn({
          title: column.title,
          order: column.order,
          columnId: column.id,
          boardId,
        })
      )
    );
    const beforeChangedColumns = [...sortedElements].slice(0, hoveredItem.index);
    const afterChangedColumns = [...sortedElements].slice(
      draggingItem.index + 1,
      sortedElements.length
    );
    newColumns = [
      ...beforeChangedColumns,
      { ...updatedDraggingItem, order: hoverItemOrder },
      ...changedColumns,
      ...afterChangedColumns,
    ];
    dispatch(
      updateColumn({
        title: updatedDraggingItem.title,
        order: hoverItemOrder,
        columnId: updatedDraggingItem.id,
        boardId,
      })
    );
    dispatch(updateColumnData(newColumns));
    return;
  } else if (hoveredItem.index > draggingItem.index) {
    const changedColumns = [...sortedElements]
      .slice(draggingItem.index + 1, hoveredItem.index)
      .map((item) => {
        return (item = { ...item, order: item.order - 1 });
      });
    changedColumns.forEach((column) =>
      dispatch(
        updateColumn({
          title: column.title,
          order: column.order,
          columnId: column.id,
          boardId,
        })
      )
    );
    const beforeChangedColumns = [...sortedElements].slice(0, draggingItem.index);
    const afterChangedColumns = [...sortedElements].slice(
      hoveredItem.index + 1,
      sortedElements.length
    );
    dispatch(
      updateColumn({
        title: updatedDraggingItem.title,
        order: hoverItemOrder,
        columnId: updatedDraggingItem.id,
        boardId,
      })
    );
    newColumns = [
      ...beforeChangedColumns,
      ...changedColumns,
      { ...updatedDraggingItem, order: hoverItemOrder },
      ...afterChangedColumns,
    ];
    dispatch(updateColumnData(newColumns));
    return;
  }
};
