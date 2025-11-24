import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa';
import styles from './footer.module.css'; 

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <h2 className={styles.brand}>De La Ropa</h2>
        
        <p className={styles.tagline}>
          Your one-stop-shop for fashionable clothing
        </p>

        <div className={styles.links}>
          <Link href="/faq" className={styles.linkItem}>
            FAQ
          </Link>
        </div>

        <div className={styles.socials}>
          <a href="https://instagram.com" className={styles.iconLink}><FaInstagram /></a>
          <a href="https://facebook.com" className={styles.iconLink}><FaFacebookF /></a>
          <a href="https://pinterest.com" className={styles.iconLink}><FaPinterestP /></a>
        </div>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} De La Ropa. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
}