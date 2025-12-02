import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './produk.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  origPrice: number;
  image: string;
  createdAt: Date;
}

export const dynamic = 'force-dynamic';

export default async function ProdukPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className={styles.produkSale}>
      <h2>Our Products</h2>

      <div className={styles.produkContainer}>
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
            <Link href={`/produk/${product.id}`} className={styles.addToCart}>
              View Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}