import { NextApiHandler } from 'next';
import axios from 'axios';
import { TypeMethod } from '@/types/forms';

const fetchUsers: NextApiHandler = async function (request, response) {
  const { method, body, query, headers } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL + `Users/${query?.type ?? body?.type}`;

  switch (method) {
    case TypeMethod.GET:
      await axios
        .get(url, {
          headers: { Authorization: headers.authorization },
        })
        .then((res) => {
          return response.status(200 | 300).json(res.data);
        })
        .catch((error) => {
          return response.status(400 | 500).json(error.response.data);
        });

    case TypeMethod.POST:
      await axios
        .post(url, body?.data, {
          headers: { Authorization: headers.authorization },
        })
        .then((res) => {
          return response.status(200 | 300).json(res.data);
        })
        .catch((error) => {
          return response.status(400 | 500).json(error.response.data);
        });

    case TypeMethod.PUT:
      await axios
        .put(url, body?.data, {
          headers: { Authorization: headers.authorization },
        })
        .then((res) => {
          return response.status(200 | 300).json(res.data);
        })
        .catch((error) => {
          return response.status(400 | 500).json(error.response.data);
        });
  }
};

export default fetchUsers;
