import axios from 'axios';
import { sessionManager } from './cookies';
import { handleUnauthorizedError } from '../Utils/errorHandler';
import {
  baseURL
} from '../API/Api';

// axios للطلبات العامة (بدون توكن)
export const publicAxios = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios للطلبات المحمية (مع توكن)
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة التوكن تلقائياً لكل طلب
axiosInstance.interceptors.request.use(
  (config) => {
    const session = sessionManager.restoreSession();
    const token = session?.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 إضافة التوكن للطلب:', config.url);
    } else {
      console.log('⚠️ لا يوجد توكن للطلب:', config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// معالجة استجابة الطلبات
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ نجح الطلب:', response.config.url);
    return response;
  },
  async (error) => {
    console.log('❌ فشل الطلب:', error.config?.url, error.response?.status);
    
    // معالجة خطأ 401 (غير مصرح)
    if (error.response?.status === 401) {
      return handleUnauthorizedError(error, error.config, axiosInstance);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 