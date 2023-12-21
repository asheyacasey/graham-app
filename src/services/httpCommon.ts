import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { store } from '@/redux'

interface Config extends AxiosRequestConfig { }

const BASE = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = BASE;

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = store.getState().auth?.token
    // const accessToken = Cookies.get('access_token');
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';

    return Promise.resolve(config);
  },
  (err) => {
    return Promise.reject(err);
  }
);

const get = (url: string, config: Config = {}): Promise<AxiosResponse> =>
  axios.get(url, config);

const post = (
  url: string,
  data: any,
  config: Config = {}
): Promise<AxiosResponse> => axios.post(url, data, config);

const put = (
  url: string,
  data: any,
  config: Config = {}
): Promise<AxiosResponse> => axios.put(url, data, config);

const patch = (
  url: string,
  data: any,
  config: Config = {}
): Promise<AxiosResponse> => axios.patch(url, data, config);

const del = (url: string, config: Config = {}): Promise<AxiosResponse> =>
  axios.delete(url, config);

export default {
  get,
  post,
  put,
  patch,
  del,
};
