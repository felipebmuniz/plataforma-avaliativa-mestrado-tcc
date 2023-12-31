import { NextApiHandler } from "next";
import axios, { AxiosResponse } from "axios";
import { TypeMethod } from "@/types/forms";

const fetchUsers: NextApiHandler = async function (request, response) {
  const { method, body, query, headers } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL + `/Users/${query?.type ?? body?.type}`;

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

      return response.status(400).json("Erro interno na API");

    case TypeMethod.DELETE:
      console.log("URL =>", `${baseURL}/Users/${query?.id}`);

      await axios
        .delete(`${baseURL}/Users/${query?.id}`, {
          headers: { Authorization: headers.authorization },
        })
        .then((res) => {
          return response.status(200).json(res.data);
        })
        .catch((error) => {
          return response
            .status(400 | 500)
            .json(error?.response?.data ?? "Erro Interno");
        });
  }
};

export default fetchUsers;
