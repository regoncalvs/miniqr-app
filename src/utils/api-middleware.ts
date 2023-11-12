import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {    
    return response;
  },
  (error) => {    
    console.error('Erro na requisição:', error);

    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode === 401) {        
        message.error('Sua sessão expirou. Por favor, faça login novamente.');
      } else if (statusCode === 403) {        
        message.error('Você não tem permissão para acessar este recurso.');
      } else if (statusCode === 400) {        
        message.error(error.response.data.detail);
      }
    } else if (error.request) {      
      message.error('Não foi possível obter resposta do servidor.');
    } else {      
      message.error('Erro ao configurar a requisição.');
    }
    
    return Promise.reject(error);
  }
);

export default api;