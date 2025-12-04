import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from '../profile.module.css';
import EditProfileForm from './form';

export const dynamic = 'force-dynamic';

export default async function EditProfilePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) redirect('/signin');

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) redirect('/signin');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Edit Your Profile</h2>
        <EditProfileForm user={user} />
      </div>
    </div>
  );
}