import { NextApiHandler } from 'next';
import axios, { AxiosResponse } from 'axios';
import { TypeMethod } from '@/types/forms';

const fetchClassesRemoveStudentEvaluation: NextApiHandler = async function (
  request,
  response,
) {
  const { method, body, query, headers } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url =
    baseURL +
    `Classes/${body?.data?.classId}/remove-class-students-evaluation/${body?.data?.evaluationId}`;

  let apiResponse: AxiosResponse<any, any>;

  switch (method) {
    case TypeMethod.POST:
      apiResponse = await axios.post(url, null, {
        headers: { Authorization: headers.authorization },
      });
      if (apiResponse.status === 200) {
        return response.status(200).json(apiResponse.data);
      }

      return response.status(400).json('Erro interno na API');
  }
};

export default fetchClassesRemoveStudentEvaluation;
