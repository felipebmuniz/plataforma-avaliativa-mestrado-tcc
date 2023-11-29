export interface classesList {
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

export interface classesCreate {
  code: string;
  subjectId: string;
  teacherId: string;
  period: number;
  year: number;
  open: boolean;
}

export interface classesUpdate {
  classId: string;
  code?: string;
  subjectId?: string;
  teacherId?: string;
  period?: number;
  year?: number;
  open?: boolean;
}

export interface classesRelationStudent {
  classId: string;
  studentId: string;
}

// export interface classesRelationTeacher {
//   classId: string;
//   teacherId: string;
// }

export interface classesRelationEvaluation {
  classId: string;
  evaluationId: string;
}
