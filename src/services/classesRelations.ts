import axios from 'axios';
import {
  classesRelationStudent,
  classesRelationEvaluation,
} from '@/types/classes';

const classesRelationsServices = () => ({
  createRelationUser: async (data: classesRelationStudent) => {
    const response = await axios.post('/api/classe-relation/add-student', {
      data: data,
    });
    return response;
  },
  deleteRelationUser: async (data: classesRelationStudent) => {
    const response = await axios.post(`/api/classe-relation/remove-student`, {
      data: data,
    });
    return response;
  },
  createRelationUserEvaluation: async (data: classesRelationEvaluation) => {
    const response = await axios.post(
      '/api/classe-relation/add-student-evaluation',
      {
        data: data,
      },
    );
    return response;
  },
  deleteRelationUserEvaluation: async (data: classesRelationEvaluation) => {
    const response = await axios.post(
      `/api/classe-relation/remove-student-evaluation`,
      {
        data: data,
      },
    );
    return response;
  },
  createRelationTeacherEvaluation: async (data: classesRelationEvaluation) => {
    const response = await axios.post(
      '/api/classe-relation/add-teacher-evaluation',
      {
        data: data,
      },
    );
    return response;
  },
  deleteRelationTeacherEvaluation: async (data: classesRelationEvaluation) => {
    const response = await axios.post(
      `/api/classe-relation/remove-teacher-evaluation`,
      {
        data: data,
      },
    );
    return response;
  },
});

export { classesRelationsServices };
