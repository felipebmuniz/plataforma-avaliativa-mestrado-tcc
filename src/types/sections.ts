type SectionName =
  | 'Área de avaliação'
  | 'Métricas'
  | 'Sobre o programa'
  | 'Acesso exclusivo';

type SectionSrc = '#avaliacao' | '#metricas' | '#programa' | '#exclussivo';

export interface Section {
  name: SectionName;
  src: SectionSrc;
}
