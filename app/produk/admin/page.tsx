import Image from 'next/image';
import Link from 'next/link';
import styles from './admin.module.css';

const products = [
  { id: 1, name: 'BAJU A', price: 'IDR 450.000', originalPrice: 'IDR 699.000', image: '/images/cropped-Gambar1.jpg' },
  { id: 2, name: 'BAJU B', price: 'IDR 450.000', originalPrice: 'IDR 699.000', image: '/images/cropped-Gambar2.jpg' },
  { id: 3, name: 'BAJU C', price: 'IDR 450.000', originalPrice: 'IDR 699.000', image: '/images/cropped-Gambar3.webp' },
];

export default function AdminPage() {
  return (
    <div className={styles.produkSale}>
      <h2>Manage Products</h2>

      <div className={styles.produkContainer}>
        
        <div className={`${styles.produkCard} ${styles.addNewCard}`}>
          <Link href="/produk/admin/detail" className={styles.addNewLink}>
            <div className={styles.addNewContent}>
              <span className={styles.plusSign}>+</span>
              <p>Add New Product</p>
            </div>
          </Link>
        </div>

        {products.map((product) => (
          <div key={product.id} className={styles.produkCard}>
            <Link href={`/produk/admin/detail${product.id}`} className={styles.produkImageLink}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 992px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
            </Link>
            <h3>{product.name}</h3>
            <p className={styles.price}>
              {product.price} <span className={styles.originalPrice}>{product.originalPrice}</span>
            </p>
            <Link href={`/produk/admin/detail/${product.id}`} className={styles.addToCart}>
              Edit Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}