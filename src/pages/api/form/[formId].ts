import { NextApiHandler } from 'next';
import { AxiosResponse } from 'axios';
import { TypeMethod } from '@/types/forms';
import { api } from '@/services/api';

const showFrom: NextApiHandler = async function (request, response) {
  const { query, method } = request;

  if (!query.formId) {
    return response.status(400).json('Id do provedor/cidade faltando');
  }

  const url = `/Forms/${query.formId}`;

  let apiResponse: AxiosResponse<any, any>;

  switch (method) {
    case TypeMethod.GET:
      apiResponse = await api.get(url);
      if (apiResponse.status === 200) {
        return response.status(200).json(apiResponse.data);
      } else if (apiResponse.status === 400) {
        return response.status(400).json('Erro interno na API');
      } else {
        return apiResponse.data;
      }

    case TypeMethod.DELETE:
      apiResponse = await api.delete(url);
      if (apiResponse.status === 200) {
        return response.status(200).json(apiResponse.data);
      } else if (apiResponse.status === 400) {
        return response.status(400).json('Erro interno na API');
      } else {
        return apiResponse.data;
      }
  }
};

export default showFrom;
