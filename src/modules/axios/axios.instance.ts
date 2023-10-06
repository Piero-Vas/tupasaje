import axios from 'axios';
import {API_URL} from '@/config/env';
import Cookies from 'js-cookie';

const cookieToken = Cookies.get('token');

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {Authorization: `Bearer ${cookieToken}`},
});
