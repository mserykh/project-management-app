import axios from 'axios';
import BASE_URL from './constants';

const createBoard = async (title: string): Promise<void> => {
  try {
    await axios.post(
      `${BASE_URL}/boards`,
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export default createBoard;
