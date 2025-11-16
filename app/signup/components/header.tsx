import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">DE LA ROPA</Link>
      </div>
      <div className={styles.links}>
        <Link href="/produk/detail">Products</Link>
      </div>
      <div className={styles.actions}>
        <Link href="/account">my account</Link>
        <Link href="/cart">shopping cart</Link>
      </div>
    </nav>
  );
}