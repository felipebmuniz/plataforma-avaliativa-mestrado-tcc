import { NextApiHandler } from "next";
import axios, { AxiosResponse } from "axios";
import { TypeMethod } from "@/types/forms";

const fetchEvaluations: NextApiHandler = async function (request, response) {
  const { method, body, query, headers } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL + `/Evaluation`;

  let apiResponse: AxiosResponse<any, any>;

  switch (method) {
    case TypeMethod.GET:
      apiResponse = await axios.get(url, {
        headers: { Authorization: headers.authorization },
      });
      if (apiResponse.status === 200) {
        return response.status(200).json(apiResponse.data);
      }

      return response.status(400).json("Erro interno na API");

    case TypeMethod.POST:
      await axios
        .post(url, body?.data, {
          headers: { Authorization: headers.authorization },
        })
        .then((res) => {
          return response.status(200).json(res.data);
        })
        .catch((error) => {
          return response.status(400 | 500).json(error.response.data);
        });

    case TypeMethod.PUT:
      apiResponse = await axios.put(url, body?.data, {
        headers: { Authorization: headers.authorization },
      });
      if (apiResponse.status === 200) {
        return response.status(200).json(apiResponse.data);
      }

    case TypeMethod.DELETE:
      await axios
        .delete(url + `/${query?.evaluationID}`, {
          headers: { Authorization: headers.authorization },
        })
        .then((res) => {
          return response.status(200).json(res.data);
        })
        .catch((error) => {
          return response.status(400 | 500).json(error.response.data);
        });
  }
};

export default fetchEvaluations;
