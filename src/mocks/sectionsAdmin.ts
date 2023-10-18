import { SectionAdmin } from '@/types/sectionsAdim';

export const SectionsAdminMock: SectionAdmin[] = [
  {
    src: '/',
    label: 'Voltar para a página inicial',
    textDecoration: true,
    type: 'link',
  },
  {
    src: '/admin/usuarios',
    label: 'Criar Usuários',
    textDecoration: false,
    type: 'button',
  },
  {
    src: '/admin',
    label: 'Criar Turmas',
    textDecoration: false,
    type: 'button',
  },
  {
    src: '/admin',
    label: 'Criar Formulários',
    textDecoration: false,
    type: 'button',
  },
];
