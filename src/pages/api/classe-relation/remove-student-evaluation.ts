import { NextApiHandler } from "next";
import axios from "axios";

const fetchClassesRemoveStudentEvaluation: NextApiHandler = async function (
  request,
  response,
) {
  const { body, headers } = request;

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const url =
    baseURL +
    `/Classes/${body?.data?.classId}/remove-class-students-evaluation/${body?.data?.evaluationId}`;

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

export default fetchClassesRemoveStudentEvaluation;
