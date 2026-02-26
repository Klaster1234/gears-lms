import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return <AdminDashboard />;
}
