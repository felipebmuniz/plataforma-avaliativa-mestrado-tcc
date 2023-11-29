import axios from 'axios';
import {
  classesRelationStudent,
  classesRelationEvaluation,
} from '@/types/classes';

const classesRelationsServices = () => ({
  createRelationStudent: async (data: classesRelationStudent) => {
    const response = await axios.post('/api/classe-relation/add-student', {
      data: data,
    });
    return response;
  },
  deleteRelationStudent: async (data: classesRelationStudent) => {
    const response = await axios.post(`/api/classe-relation/remove-student`, {
      data: data,
    });
    return response;
  },
  createRelationStudentEvaluation: async (data: classesRelationEvaluation) => {
    const response = await axios.post(
      '/api/classe-relation/add-student-evaluation',
      {
        data: data,
      },
    );
    return response;
  },
  deleteRelationStudentEvaluation: async (data: classesRelationEvaluation) => {
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
