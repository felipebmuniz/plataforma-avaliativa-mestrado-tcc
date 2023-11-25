import { NextApiHandler } from 'next';
import { api } from '@/services/api';

const validateUser: NextApiHandler = async function (request, response) {
  const { body } = request;

  const url = `/Users/Validate/${body.accessToken}`;

  const apiResponse = await api.post(url);
  if (apiResponse.status === 200) {
    return response.status(200).json(apiResponse.data);
  }

  return response.status(400).json('Erro interno na API');
};

export default validateUser;
