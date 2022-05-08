import axios from 'axios';

interface Payload {
  title: string;
}

export const getHttp = async (
  url: string,
  query: Record<string, unknown>,
  params?: Record<string, unknown>
): Promise<void> => {
  const urlWithQuery: string =
    url +
    Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');
  try {
    await axios.get(urlWithQuery, params);
  } catch (e) {
    console.log(e);
  }
};
const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

export const postHttp = async (url: string, payload: Payload): Promise<void> => {
  const body = {
    ...payload,
  };
  try {
    await axios.post(url, body, config);
  } catch (e) {
    console.log(e);
  }
};
