import axios from 'axios';
import { AcessesLoginResponse, LoginResponse } from '@/types/auth';

const authServices = () => ({
  login: async (data: AcessesLoginResponse) => {
    const response = await axios.post<LoginResponse>('/api/auth/login', data);
    return response;
  },
  Validate: async (data: { token: string }) => {
    const response = await axios.post('/api/auth/validate', data);
    return response.data;
  },
  // create: async (formId: string) => {
  //   const response = await axios.delete(`/api/form/${formId}`);
  //   return response.data;
  // },
  // show: async (formId: string) => {
  //   const response = await axios.get<FormsResponse>(`/api/form/${formId}`);
  //   return response.data;
  // },
  // list: async () => {
  //   const response = await axios.get<FormsResponse[]>('/api/forms');
  //   return response.data;
  // },
});

export { authServices };
