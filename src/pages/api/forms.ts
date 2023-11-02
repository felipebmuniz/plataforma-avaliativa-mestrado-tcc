import { NextApiHandler } from 'next';
import axios from 'axios';

const listForms: NextApiHandler = async function (_, response) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = `${apiUrl}/Forms`;

  const apiResponse = await axios.get(url);

  if (apiResponse.status === 200) {
    return response.status(200).json(apiResponse.data);
  }

  return response.status(400).json('Erro interno na API');
};

export default listForms;
