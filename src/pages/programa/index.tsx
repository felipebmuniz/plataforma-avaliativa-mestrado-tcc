import PublicLayout from '@/layouts/PublicLayout';
import { Metrics } from '@/components/sections/Metrics';
import { ProgramEvaluation } from '@/components/sections/ProgramEvaluation';

export default function Programa() {
  return (
    <PublicLayout
      title="Plataforma Autoavaliativa Mestrado"
      description="Área de métricas da Plataforma Autoavaliativa do Mestrado - UFC"
    >
      <ProgramEvaluation />
    </PublicLayout>
  );
}
