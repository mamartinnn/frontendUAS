import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import styles from './admin.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  origPrice: number;
  image: string;
}

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className={styles.produkSale}>
      <h2>Admin Dashboard</h2>

      <div className={styles.produkContainer}>
        <div className={styles.addNewCard}>
          <Link href="/produk/admin/create" className={styles.addNewLink}>
            <div className={styles.addNewContent}>
              <span className={styles.plusSign}>+</span>
              <p>Add New Product</p>
            </div>
          </Link>
        </div>

        {products.map((product: Product) => (
          <div key={product.id} className={styles.produkCard}>
            <Link href={`/produk/${product.id}`} className={styles.produkImageLink}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={533}
                style={{ objectFit: 'cover' }}
              />
              <h3>{product.name}</h3>
              <p className={styles.price}>
                IDR {product.price.toLocaleString('id-ID')}
                <span className={styles.originalPrice}>
                  IDR {product.origPrice.toLocaleString('id-ID')}
                </span>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}