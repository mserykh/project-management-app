import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

type BoardPayload = {
  title: string;
  description: string;
};

type ColumnPayload = {
  title: string;
  order: number;
};

type TaskPayload = {
  title: string;
  description: string;
  order: number;
  userId?: string;
};

export type Payload = BoardPayload | ColumnPayload | TaskPayload;

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
  payload: Payload,
  navigate: (url: string) => void
): Promise<AxiosResponse<unknown> | void> => {
  const body = { ...payload };
  try {
    const res = await axios.post<Payload, AxiosResponse<unknown, AxiosError>>(url, body, config);
    return res;
  } catch (e) {
    if ((e as AxiosError).response?.status === 401) {
      navigate('/login');
      toast.error(`Your session has been expired. Please log in`);
    }
    toast.error(`An error ${(e as AxiosError).message}!`);
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
