import { NextApiHandler } from "next";
import axios from "axios";

const validateEvaluationUser: NextApiHandler = async function (
  request,
  response,
) {
  const { query } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL + `/Evaluation/${query?.id}/access/${query?.accessToken}`;

  await await axios
    .get(url)
    .then((res) => {
      return response.status(200).json(res.data);
    })
    .catch((error) => {
      return response.status(400 | 500).json(error.response.data);
    });
};

export default validateEvaluationUser;
