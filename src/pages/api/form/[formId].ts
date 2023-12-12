import { NextApiHandler } from "next";
import axios, { AxiosResponse } from "axios";
import { TypeMethod } from "@/types/forms";

const showFrom: NextApiHandler = async function (request, response) {
  const { query, method, headers } = request;

  if (!query.formId) {
    return response.status(400).json("Id do provedor/cidade faltando");
  }

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL + `/Forms/${query.formId}`;

  let apiResponse: AxiosResponse<any, any>;

  switch (method) {
    case TypeMethod.GET:
      apiResponse = await axios.get(url, {
        headers: { Authorization: headers.authorization },
      });
      if (apiResponse.status === 200) {
        return response.status(200).json(apiResponse.data);
      } else if (apiResponse.status === 400) {
        return response.status(400).json("Erro interno na API");
      } else {
        return apiResponse.data;
      }

    case TypeMethod.DELETE:
      await axios
        .delete(url, {
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

export default showFrom;
