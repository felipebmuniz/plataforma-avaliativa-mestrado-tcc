import axios from 'axios';
import { subjectsCreate, subjectsList, subjectsUpdate } from '@/types/subjects';

const subjectsServices = () => ({
  create: async (data: subjectsCreate) => {
    const response = await axios.post('/api/subjects', {
      data: data,
    });
    return response;
  },
  update: async (data: subjectsUpdate) => {
    const response = await axios.put('/api/subjects', {
      data: data,
    });
    return response;
  },
  delete: async (subjectId: string) => {
    const response = await axios.delete(`/api/user/${subjectId}`);
    return response;
  },
  list: async () => {
    const response = await axios.get<subjectsList[]>('/api/subjects');
    return response;
  },
});

export { subjectsServices };
