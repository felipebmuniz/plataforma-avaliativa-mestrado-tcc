import axios from 'axios';
// import {
//   userType,
//   EnumUserType,
//   userCreate,
//   userUpdate,
//   userList,
// } from '@/types/users';

const defaultServices = () => ({
  // create: async (data: userCreate, type: userType) => {
  //   const response = await axios.post('/api/users', {
  //     data: data,
  //     type: EnumUserType[type],
  //   });
  //   return response;
  // },
  // update: async (data: userUpdate, type: userType) => {
  //   const response = await axios.put('/api/users', {
  //     data: data,
  //     type: EnumUserType[type],
  //   });
  //   return response;
  // },
  // delete: async (userId: string) => {
  //   const response = await axios.delete(`/api/user/${userId}`);
  //   return response;
  // },
  // list: async (type: userType) => {
  //   const response = await axios.get<userList[]>('/api/users', {
  //     params: {
  //       type: EnumUserType[type],
  //     },
  //   });
  //   return response;
  // },
  // show: async (userId: string) => {
  //   const response = await axios.get<FormsResponse>(`/api/user/${userId}`);
  //   return response;
  // },
});

export { defaultServices };
