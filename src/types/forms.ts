export interface FormsResponse {
  name: string;
  questions?: QuestionsResponse;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionsResponse {
  formId: string;
  statement: string;
  type: number;
  options: OptionsResponse[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface OptionsResponse {
  questionId: string;
  value: string;
  order: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export enum TypeMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

// ###################################################################

export interface ICreateFrom {
  name: string;
}

export interface IPutFrom {
  id: string;
  name: string;
}

export interface IListFrom {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
