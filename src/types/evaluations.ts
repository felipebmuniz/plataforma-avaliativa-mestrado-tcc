export interface evaluationsList {
  code: string;
  subjectId: string;
  teacherId: string;
  period: number;
  year: number;
  open: boolean;
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
