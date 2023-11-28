import { NextApiHandler } from 'next';
import axios from 'axios';

const validateUser: NextApiHandler = async function (request, response) {
  const { body } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL + `/Users/Validate/${body.accessToken}`;

  const apiResponse = await axios.post(url);
  if (apiResponse.status === 200) {
    return response.status(200).json(apiResponse.data);
  }

  return response.status(400).json('Erro interno na API');
};

export default validateUser;
