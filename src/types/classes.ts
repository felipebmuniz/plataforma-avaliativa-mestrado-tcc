export interface classesList {
  classId: string;
  code: string;
  subjectId: string;
  teacherId: string;
  period: number;
  year: number;
  open: boolean;
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

export interface classesRelationTeacher {
  classId: string;
  teacherId: string;
}

export interface classesRelationEvaluation {
  classId: string;
  evaluationId: string;
}
