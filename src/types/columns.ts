export type columnsUsers =
  | "userId"
  | "studentId"
  | "teacherId"
  | "name"
  | "email"
  | "validated"
  | "studentCode"
  | "id"
  | "options"
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

export type columnsSubjects = "name" | "code" | "createdAt" | "options";

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
  | "students"
  | "relations"
  | "options"
  | "teacher";

export enum EColumnsClasses {
  period = "Período",
  open = "Estado",
  year = "Ano de vigência",
  code = "Código",
}

export type columnsForms = "name" | "id" | "createdAt" | "preview" | "options";

export enum EColumnsForms {
  id = "ID",
  name = "Nome",
  createdAt = "Data de criação",
}

export type columnsEvaluations =
  | "title"
  | "startDate"
  | "endDate"
  | "form"
  | "answers"
  | "options"
  | "users";

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
  preview = "Visualizar",
  users = "Visualizar Usuários",
  students = "Visualizar Discentes",
  answers = "Visualizar Respostas",
  options = "Opções de Ação",
}
