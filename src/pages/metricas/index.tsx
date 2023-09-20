import PublicLayout from '@/layouts/PublicLayout';
import { Metrics } from '@/components/sections/Metrics';

export default function Metricas() {
  return (
    <PublicLayout
      title="Plataforma Autoavaliativa Mestrado"
      description="Área de métricas da Plataforma Autoavaliativa do Mestrado - UFC"
    >
      <Metrics />
    </PublicLayout>
  );
}
