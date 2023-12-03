export type columnsUsers =
  | "userId"
  | "studentId"
  | "teacherId"
  | "name"
  | "email"
  | "validated"
  | "studentCode"
  | "teacherCode";

export enum EColumnsUsers {
  userId = "ID do Usuário",
  studentId = "ID do Discente",
  teacherId = "ID do Docente",
  name = "Nome",
  email = "Email",
  validated = "Validação",
  studentCode = "Código do Discente",
  teacherCode = "Código do Docente",
}

export type columnsSubjects = "name" | "code" | "createdAt";

export enum EColumnsSubjects {
  name = "Nome",
  code = "Código",
  createdAt = "Data de Criação",
}

export type columnsClasses =
  | "period"
  | "open"
  | "year"
  | "code"
  | "subject"
  | "relations"
  | "teacher";

export enum EColumnsClasses {
  period = "Período",
  open = "Estado",
  year = "Ano de vigência",
  code = "Código",
}

export type columnsForms = "name" | "id" | "createdAt";

export enum EColumnsForms {
  id = "ID",
  name = "Nome",
  createdAt = "Data de criação",
}

export type columnsEvaluations = "title" | "startDate" | "endDate" | "form";

export enum EColumnsEvaluations {
  title = "Título",
  startDate = "Data de início",
  endDate = "Data de enceramento",
  form = "Formulário",
}

export enum EColumns {
  userId = "ID do Usuário",
  studentId = "ID do Discente",
  teacherId = "ID do Docente",
  email = "Email",
  validated = "Validação",
  studentCode = "Código do Discente",
  teacherCode = "Código do Docente",
  period = "Período",
  open = "Estado",
  year = "Ano de vigência",
  code = "Código",
  id = "ID",
  name = "Nome",
  createdAt = "Data de criação",
  title = "Título",
  startDate = "Data de início",
  endDate = "Data de enceramento",
  form = "Formulário",
  teacher = "Docente",
  subject = "Disciplina",
  relations = "Opções de Vinculações",
}
