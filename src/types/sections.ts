type SectionName =
  | 'Área de avaliação'
  | 'Métricas'
  | 'Sobre o programa'
  | 'Acesso exclusivo';

type SectionSrc = '/avaliacao' | '/metricas' | '#programa';

export interface Section {
  name: SectionName;
  src: SectionSrc;
}
