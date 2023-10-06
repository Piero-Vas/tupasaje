import {makeUseAxios} from 'axios-hooks';
import {axiosInstance} from './axios.instance';

export const useAxios = makeUseAxios({axios: axiosInstance});
