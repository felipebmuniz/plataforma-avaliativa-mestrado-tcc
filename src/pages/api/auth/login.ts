import { NextApiHandler } from 'next';
import { api } from '@/services/api';

const loginUser: NextApiHandler = async function (request, response) {
  const { body } = request;

  const url = `/Users/Admins/Login`;

  const apiResponse = await api.post(url, body);
  if (apiResponse.status === 200) {
    return response.status(200).json(apiResponse.data);
  }

  return response
    .status(400)
    .json({ data: { message: 'Erro interno na API' } });
};

export default loginUser;
