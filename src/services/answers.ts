import axios from "axios";
import { answersCreate, answersList } from "@/types/answers";

const answersServices = () => ({
  create: async (data: answersCreate, accessToken: string) => {
    const response = await axios.post(
      "/api/answers",
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  },
  list: async (evaluationId: string) => {
    const response = await axios.get("/api/answers", {
      params: {
        evaluationId: evaluationId,
      },
    });
    return response.data;
  },
});

export { answersServices };
