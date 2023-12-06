import { NextApiHandler } from "next";
import axios from "axios";

const validateUser: NextApiHandler = async function (request, response) {
  const { body } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url = baseURL + `/Users/Validate/${body.validationToken}`;

  await axios
    .post(url)
    .then((res) => {
      return response.status(200).json(res.data);
    })
    .catch((error) => {
      return response.status(400 | 500).json(error.response.data);
    });
};

export default validateUser;
