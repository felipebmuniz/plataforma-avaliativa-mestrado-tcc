import { NextApiHandler } from 'next';
import { AxiosResponse } from 'axios';
import { TypeMethod } from '@/types/forms';
import { api } from '@/services/api';

const fetchUsers: NextApiHandler = async function (request, response) {
  const { method, body, query, headers } = request;

  const url = `Users/${query?.type ?? body?.type}`;

  let apiResponse: AxiosResponse<any, any>;

  switch (method) {
    case TypeMethod.GET:
      apiResponse = await api.get(url, {
        headers: { Authorization: headers.authorization },
      });
      if (apiResponse.status === 200) {
        return response.status(200).json(apiResponse.data);
      }

      return response.status(400).json('Erro interno na API');

    case TypeMethod.POST:
      apiResponse = await api.post(url, body?.data, {
        headers: { Authorization: headers.authorization },
      });
      if (apiResponse.status === 200) {
        return response.status(200).json(apiResponse.data);
      }

      return response.status(400).json('Erro interno na API');

    case TypeMethod.PUT:
      apiResponse = await api.put(url, body?.data, {
        headers: { Authorization: headers.authorization },
      });
      if (apiResponse.status === 200) {
        return response.status(200).json(apiResponse.data);
      }

      return response.status(400).json('Erro interno na API');
  }
};

export default fetchUsers;
