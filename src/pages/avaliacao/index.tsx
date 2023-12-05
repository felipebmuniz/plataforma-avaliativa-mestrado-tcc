import PublicLayout from "@/layouts/PublicLayout";
import { EvaluationArea } from "@/components/sections/EvaluationArea";
import { FormEvaluation } from "@/components/sections/FormEvaluation";

export default function Avaliacao() {
  return (
    <PublicLayout
      title="Plataforma Autoavaliativa Mestrado"
      description="Área de métricas da Plataforma Autoavaliativa do Mestrado - UFC"
    >
      {/* <EvaluationArea /> */}
      <FormEvaluation />
    </PublicLayout>
  );
}
