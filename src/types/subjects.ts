export interface subjectsList {
  name: string;
  code: string;
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface subjectsCreate {
  name: string;
  code: string;
}

export interface subjectsUpdate {
  name?: string;
  code?: string;
  id?: string;
}
