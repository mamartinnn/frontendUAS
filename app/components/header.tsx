import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">DE LA ROPA</Link>
      </div>
      <div className={styles.links}>
        <Link href="/produk">Products</Link>
      </div>
      <div className={styles.actions}>
        <Link href="/profile">my account</Link>
        <Link href="/wishlist">shopping cart</Link>
      </div>
    </nav>
  );
}