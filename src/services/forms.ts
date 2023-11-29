import axios from "axios";
import { FormsResponse, ICreateFrom, IPutFrom } from "@/types/forms";

const formsServices = () => ({
  create: async (data: ICreateFrom) => {
    const response = await axios.post("/api/forms", data);
    return response;
  },
  update: async (data: IPutFrom) => {
    const response = await axios.put("/api/forms", data);
    return response;
  },
  delete: async (formId: string) => {
    const response = await axios.delete(`/api/form/${formId}`);
    return response;
  },
  show: async (formId: string) => {
    const response = await axios.get<FormsResponse>(`/api/form/${formId}`);
    return response;
  },
  list: async () => {
    const response = await axios.get<FormsResponse[]>("/api/forms");
    return response;
  },
});

export { formsServices };
