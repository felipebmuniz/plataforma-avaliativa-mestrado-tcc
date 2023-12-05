import { NextApiHandler } from "next";
import axios from "axios";

const validateEvaluationUser: NextApiHandler = async function (
  request,
  response,
) {
  const { query } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL + `/Evaluation/${query?.id}/access/${query?.accessToken}`;

  const apiResponse = await axios.get(url);
  if (apiResponse.status === 200) {
    return response.status(200).json(apiResponse.data);
  }

  return response.status(400 | 500).json("Erro interno na API");
};

export default validateEvaluationUser;
