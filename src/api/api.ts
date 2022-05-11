import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface Payload {
  title: string;
  order?: number;
}

interface Column {
  id: string;
  title: string;
  order: number;
}

interface Board {
  id: string;
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

export const postHttp = async (
  url: string,
  payload: Payload
): Promise<AxiosResponse<unknown, unknown> | void> => {
  const body = { ...payload };
  try {
    await axios.post(url, body, config);
  } catch (e) {
    toast.error('An error ${e}');
  }
};

export const putHttp = async (
  url: string,
  payload: Record<string, unknown>
): Promise<AxiosResponse<string, unknown> | void | string> => {
  const body = {
    ...payload,
  };
  try {
    await axios.put(url, body, config);
  } catch (e) {
    (e as AxiosError).message;
  }
};

export const deleteHttp = async (url: string): Promise<void | string> => {
  try {
    await axios.delete(url, config);
  } catch (e) {
    return (e as AxiosError).message;
  }
};
