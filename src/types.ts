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
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: FileInterface[];
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
