import Link from 'next/link';
import Image from 'next/image';
import styles from './profile.module.css';

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Welcome Back, Martin</h2>
        <div className={styles.accountInfo}>
          <Image 
            src="/images/RobloxScreenShot20250924_171224509.png" 
            alt="User Avatar" 
            width={100}
            height={100}
            className={styles.avatar}
          />
          <div className={styles.details}>
            <p><strong>Email:</strong> martin@example.com</p>
            <p><strong>Member Since:</strong> January 2024</p>
            <Link href="/profile/edit" className={styles.editButton}>
              Edit Profile
            </Link>
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
            <li>
              <Link href="/history" className={styles.orderLink}>
                <span>#DLR-1018</span>
                <span>Linen Summer Dress</span>
                <span>$89.00</span>
                <span style={{ color: 'green' }}>Delivered</span>
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}