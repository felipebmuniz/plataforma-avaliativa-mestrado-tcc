import PublicLayout from '@/layouts/PublicLayout';
import { EvaluationArea } from '@/components/sections/EvaluationArea';

export default function Avaliacao() {
  return (
    <PublicLayout
      title="Plataforma Autoavaliativa Mestrado"
      description="Área de métricas da Plataforma Autoavaliativa do Mestrado - UFC"
    >
      <EvaluationArea />
    </PublicLayout>
  );
}
