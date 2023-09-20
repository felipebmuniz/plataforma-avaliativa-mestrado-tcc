import PublicLayout from '@/layouts/PublicLayout';
import { LandingPage } from '@/components/sections/LandingPage';

export default function Home() {
  return (
    <PublicLayout
      title="Plataforma Autoavaliativa Mestrado"
      description="Plataforma Autoavaliativa do Mestrado - UFC"
    >
      <LandingPage />
    </PublicLayout>
  );
}
