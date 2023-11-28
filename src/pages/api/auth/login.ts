import { NextApiHandler } from 'next';
import axios from 'axios';

const loginUser: NextApiHandler = async function (request, response) {
  const { body } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL + `/Users/Admins/Login`;

  await axios
    .post(url, body)
    .then((res) => {
      return response.status(200 | 201 | 204).json(res.data);
    })
    .catch((error) => {
      return response.status(400 | 500 | 401 | 403).json(error.response.data);
    });
};

export default loginUser;
