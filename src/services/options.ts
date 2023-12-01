import axios from "axios";
import { ICreateOption, IPutOption } from "@/types/forms";

const optionsServices = () => ({
  create: async (data: ICreateOption) => {
    const response = await axios.post("/api/options", {
      data: data,
    });
    return response;
  },
  update: async (data: IPutOption) => {
    const response = await axios.put("/api/options", {
      data: data,
    });
    return response;
  },
  delete: async (optionId: string) => {
    const response = await axios.delete(`/api/options`, {
      params: { optionId: optionId },
    });
    return response;
  },
});

export { optionsServices };
