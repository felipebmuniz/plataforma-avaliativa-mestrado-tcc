import axios from 'axios';
import { FormsResponse, ICreateFrom, IPutFrom } from '@/types/forms';

const formsServices = () => ({
  create: async (data: ICreateFrom) => {
    const response = await axios.post('/api/forms', data);
    return response.data;
  },
  update: async (data: IPutFrom) => {
    const response = await axios.put('/api/forms', data);
    return response.data;
  },
  delete: async (formId: string) => {
    const response = await axios.delete(`/api/form/${formId}`);
    return response.data;
  },
  show: async (formId: string) => {
    const response = await axios.get<FormsResponse>(`/api/form/${formId}`);
    return response.data;
  },
  list: async () => {
    const response = await axios.get<FormsResponse[]>('/api/forms');
    return response.data;
  },
});

export { formsServices };
