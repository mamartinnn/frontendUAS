import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutUser } from '@/app/actions/auth';
import styles from './profile.module.css';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
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
        <h2 className={styles.title}>Welcome Back, {user.username}</h2>
        
        <div className={styles.accountInfo}>
          <Image 
            src={user.image || '/images/user.png'} 
            alt="User Avatar" 
            width={100}
            height={100}
            className={styles.avatar}
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.details}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || '-'}</p>
            <p><strong>Member Since:</strong> {user.createdAt.toLocaleDateString()}</p>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link href="/profile/edit" className={styles.editButton}>
                Edit Profile
              </Link>
              
              <form action={logoutUser}>
                <button type="submit" className={styles.logoutButton}>
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.orderHistory}>
          <h3>Your Orders</h3>
          <ul className={styles.orderList}>
            <li>
              <Link href="/history" className={styles.orderLink}>
                <span>#DLR-1023</span>
                <span>Tailored Blazer</span>
                <span>$129.00</span>
                <span style={{ color: 'green' }}>Delivered</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}