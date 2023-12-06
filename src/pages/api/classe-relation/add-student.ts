import { NextApiHandler } from "next";
import axios from "axios";

const fetchClassesAddStudent: NextApiHandler = async function (
  request,
  response,
) {
  const { body, headers } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url =
    baseURL +
    `/Classes/${body?.data?.classId}/add-student/${body?.data?.studentId}`;

  await axios
    .post(
      url,
      {},
      {
        headers: { Authorization: headers.authorization },
      },
    )
    .then((res) => {
      return response.status(200).json(res.data);
    })
    .catch((error) => {
      return response.status(400 | 500).json(error.response.data);
    });
};

export default fetchClassesAddStudent;
