import { authOptions } from '@/lib/auth';
import { getCurrentUser } from '@/lib/sessions';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div>{user.email}</div>
  )
}
