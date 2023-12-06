type SectionAdminName =
  | "Voltar para a página inicial"
  | "Usuários"
  | "Formulários/Avaliações"
  | "Disciplinas/Turmas";

type SectionAdminSrc =
  | "/"
  | "/admin"
  | "/admin/usuarios"
  | "/admin/turmas"
  | "/admin/formularios"
  | "/admin/configuracoes";

export type typeComponent = "button" | "link";

export interface SectionAdmin {
  label: SectionAdminName;
  src: SectionAdminSrc;
  textDecoration: boolean;
  type: typeComponent;
}
