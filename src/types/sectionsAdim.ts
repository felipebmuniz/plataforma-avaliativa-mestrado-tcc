import React from 'react';

type SectionAdminName =
  | 'Voltar para a página inicial'
  | 'Criar Usuários'
  | 'Criar Formulários'
  | 'Criar Turmas';

type SectionAdminSrc =
  | '/'
  | '/admin'
  | '/admin/usuarios'
  | '/admin/turmas'
  | '/admin/formularios'
  | '/admin/configuracoes';

export type typeComponent = 'button' | 'link';

export interface SectionAdmin {
  label: SectionAdminName;
  src: SectionAdminSrc;
  textDecoration: boolean;
  type: typeComponent;
}
