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

  const recentOrders = await prisma.order.findMany({
    where: { userId: userId },
    include: {
      items: true, 
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

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
            
            <div className={styles.actionButtons}>
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
          <div className={styles.recentOrdersHeader}>
            <h3>Recent Orders</h3>
            <Link href="/history" className={styles.viewAllLink}>
              View All History
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className={styles.noOrdersText}>You haven&apos;t placed any orders yet.</p>
          ) : (
            <ul className={styles.orderList}>
              {recentOrders.map((order) => {
                const firstItemName = order.items[0]?.name || 'Unknown Product';
                const otherItemsCount = order.items.length - 1;
                const displayProduct = otherItemsCount > 0 
                  ? `${firstItemName} + ${otherItemsCount} others` 
                  : firstItemName;

                return (
                  <li key={order.id}>
                    <Link href="/history" className={styles.orderLink}>
                      <span className={styles.orderId}>
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                      
                      <span className={styles.orderProduct}>
                        {displayProduct}
                      </span>
                      
                      <span className={styles.orderTotal}>
                        IDR {order.total.toLocaleString('id-ID')}
                      </span>
                      
                      <span 
                        className={`${styles.orderStatus} ${order.status === 'Selesai' ? styles.statusSuccess : styles.statusPending}`}
                      >
                        {order.status}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}