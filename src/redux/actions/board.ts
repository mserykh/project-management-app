import axios from 'axios';

const createBoard = async (title: string) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/boards',
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};

export default createBoard;
