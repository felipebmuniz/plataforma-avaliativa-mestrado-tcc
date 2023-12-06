import { SectionAdmin } from "@/types/sectionsAdim";

export const SectionsAdminMock: SectionAdmin[] = [
  // {
  //   src: '/',
  //   label: 'Voltar para a página inicial',
  //   textDecoration: true,
  //   type: 'link',
  // },
  {
    src: "/admin/usuarios",
    label: "Usuários",
    textDecoration: false,
    type: "button",
  },
  {
    src: "/admin/turmas",
    label: "Disciplinas/Turmas",
    textDecoration: false,
    type: "button",
  },
  {
    src: "/admin/formularios",
    label: "Formulários/Avaliações",
    textDecoration: false,
    type: "button",
  },
];
