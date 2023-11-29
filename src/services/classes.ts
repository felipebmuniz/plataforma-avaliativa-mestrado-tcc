import axios from 'axios';
import { classesCreate, classesUpdate, classesList } from '@/types/classes';

const classesServices = () => ({
  create: async (data: classesCreate) => {
    const response = await axios.post('/api/classes', {
      data: data,
    });
    return response;
  },
  update: async (data: classesUpdate) => {
    const response = await axios.put('/api/classes', {
      data: data,
    });
    return response;
  },
  delete: async (classesId: string) => {
    const response = await axios.delete(`/api/classes/${classesId}`);
    return response;
  },
  list: async () => {
    const response = await axios.get<classesList[]>('/api/classes');
    return response;
  },
});

export { classesServices };
