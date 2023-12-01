export interface evaluationsList {
  title: string;
  startDate: string;
  endDate: string;
  form: {
    name: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  users: any[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface evaluationsCreate {
  title: string;
  startDate: string;
  endDate: string;
  formId: string;
}

export interface evaluationsUpdate {
  id: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  formId?: number;
}
