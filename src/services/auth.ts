import axios from "axios";
import { AcessesLoginResponse, LoginResponse } from "@/types/auth";

const authServices = () => ({
  login: async (data: AcessesLoginResponse) => {
    const response = await axios.post("/api/auth/login", data);
    return response;
  },
  Validate: async (data: { validationToken: string }) => {
    const response = await axios.post("/api/auth/validate", data);
    return response;
  },
  ValidateEvaluation: async (id: string, accessToken: string) => {
    const response = await axios.get("/api/auth/validate-evaluation", {
      params: {
        id: id,
        accessToken: accessToken,
      },
    });
    return response;
  },
  // create: async (formId: string) => {
  //   const response = await axios.delete(`/api/form/${formId}`);
  //   return response.data;
  // },
  // show: async (formId: string) => {
  //   const response = await axios.get<FormsResponse>(`/api/form/${formId}`);
  //   return response.data;
  // },
  // list: async () => {
  //   const response = await axios.get<FormsResponse[]>('/api/forms');
  //   return response.data;
  // },
});

export { authServices };
