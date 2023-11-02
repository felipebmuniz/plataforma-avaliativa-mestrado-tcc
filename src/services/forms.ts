import axios from 'axios';
import { FormsResponse } from '@/types/api';

const formsServices = () => ({
  // create: async (data: FormData) => {
  //   const response = await api.post(PATH, data);
  //   return response.data;
  // },
  // show: async (id: string) => {
  //   const response = await api.get(`${PATH}/${id}`);
  //   return response.data;
  // },
  list: async () => {
    const response = await axios.get<FormsResponse[]>('/api/forms');
    return response.data;
  },
  // update: async (id: string, data: FormData) => {
  //   const response = await api.put(`${PATH}/${id}`, data);
  //   return response.data;
  // },
  // delete: async (id: string) => {
  //   await api.delete(`${PATH}/${id}`);
  // },
});

export { formsServices };
