import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { dropToken, getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import {toast} from 'react-toastify';
import { getMarkupServerError } from '../utils/get-markup-server-error';

const BACKEND_URL = 'https://13.design.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
    type: string;
    message: string;
  }

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];


export const createAPI = (): AxiosInstance => {
  let countRequest = 0;
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      const token = getToken();
      if (error.response?.status === 401 && token) {
        dropToken();
      }
      if (error.response && shouldDisplayError(error.response) &&
      error.response.data.message === 'The route is not found.') {
        countRequest++;
        if (countRequest === 1) {
          getMarkupServerError();
        }
      } else if (error.response && shouldDisplayError(error.response) &&
      error.response.data.message.slice(0, 4) === 'Film'){
        toast.warn('Film was not found');
      } else if (error.response?.status !== 401 && error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        toast.warn(detailMessage.message);
      }
      throw error;
    }
  );

  return api;
};
