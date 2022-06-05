export interface BoardInterface {
  id: string;
  title: string;
  description: string;
  columns: ColumnInterface[];
}

export interface ColumnInterface {
  id: string;
  title: string;
  order: number;
  tasks: TaskInterface[];
}

export interface TaskInterface {
  id?: string;
  title: string;
  order?: number;
  done?: boolean;
  description: string;
  userId?: string;
  files?: FileInterface[];
  columnId?: string;
  boardId?: string;
  moveTaskHandler?: (dragIndex: number, hoverIndex: number) => void;
  index?: number;
}

export interface FileInterface {
  filename: string;
  fileSize: number;
}

export interface UserInterface {
  id: string;
  login: string;
  name: string;
}
