import { postHttp } from '../../api/api';
import BASE_URL from './constants';

const createBoard = async (title: string): Promise<void> =>
  await postHttp(`${BASE_URL}/boards`, { title });

export default createBoard;
