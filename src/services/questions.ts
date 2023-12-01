import axios from "axios";
import { ICreateQuestion, IPutQuestion } from "@/types/forms";

const questionsServices = () => ({
  create: async (data: ICreateQuestion) => {
    const response = await axios.post("/api/questions", data);
    return response;
  },
  update: async (data: IPutQuestion) => {
    const response = await axios.put("/api/questions", data);
    return response;
  },
  delete: async (questionId: string) => {
    const response = await axios.delete(`/api/questions`, {
      params: { questionId: questionId },
    });
    return response;
  },
});

export { questionsServices };
