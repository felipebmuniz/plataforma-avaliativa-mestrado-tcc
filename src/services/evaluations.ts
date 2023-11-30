import axios from "axios";
import {
  evaluationsCreate,
  evaluationsList,
  evaluationsUpdate,
} from "@/types/evaluations";

const evaluationsServices = () => ({
  create: async (data: evaluationsCreate) => {
    const response = await axios.post("/api/evaluations", {
      data: data,
    });
    return response;
  },
  update: async (data: evaluationsUpdate) => {
    const response = await axios.put("/api/evaluations", {
      data: data,
    });
    return response;
  },
  delete: async (evaluationID: string) => {
    const response = await axios.delete(`/api/evaluations`, {
      params: {
        evaluationID: evaluationID,
      },
    });
    return response;
  },
  list: async () => {
    const response = await axios.get<evaluationsList[]>("/api/evaluations");
    return response;
  },
});

export { evaluationsServices };
