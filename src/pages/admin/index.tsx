import AdminLayout from '@/layouts/AdminLayout';
import { SectionAdmin } from '@/components/sections/admin/SectionAdmin';

export default function Admin() {
  return (
    <AdminLayout
      title="Plataforma Autoavaliativa Mestrado"
      description="Plataforma Autoavaliativa do Mestrado - UFC"
    >
      <SectionAdmin />
    </AdminLayout>
  );
}
