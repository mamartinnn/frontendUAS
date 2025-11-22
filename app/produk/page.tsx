import Image from 'next/image';
import Link from 'next/link';
import styles from './produk.module.css';

const products = [
  {
    id: 1,
    href: '/produk/detail',
    imgSrc: '/images/cropped-Gambar1.jpg',
    alt: 'Sale Product 1',
    name: 'BAJU A',
    price: 'IDR 450.000',
    originalPrice: 'IDR 699.000',
  },
  {
    id: 2,
    href: '/produk/detail',
    imgSrc: '/images/cropped-Gambar2.jpg',
    alt: 'Sale Product 2',
    name: 'BAJU B',
    price: 'IDR 299.000',
    originalPrice: 'IDR 599.000',
  },
  {
    id: 3,
    href: '/produk/detail',
    imgSrc: '/images/cropped-Gambar3.webp',
    alt: 'Sale Product 3',
    name: 'BAJU C',
    price: 'IDR 550.000',
    originalPrice: 'IDR 850.000',
  },
  {
    id: 4,
    href: '/produk/detail',
    imgSrc: '/images/cropped-Gambar4.jpg',
    alt: 'Sale Product 4',
    name: 'BAJU D',
    price: 'IDR 1.250.000',
    originalPrice: 'IDR 1.899.000',
  },
  {
    id: 5,
    href: '/produk/detail',
    imgSrc: '/images/cropped-Gambar5.webp',
    alt: 'Sale Product 5',
    name: 'BAJU E',
    price: 'IDR 1.800.000',
    originalPrice: 'IDR 2.500.000',
  },
  {
    id: 6,
    href: '/produk/detail',
    imgSrc: '/images/cropped-Gambar6.jpg',
    alt: 'Sale Product 6',
    name: 'BAJU F',
    price: 'IDR 1.800.000',
    originalPrice: 'IDR 2.500.000',
  },
  {
    id: 7,
    href: '/produk/detail',
    imgSrc: '/images/cropped-Gambar7.avif',
    alt: 'Sale Product 7',
    name: 'BAJU G',
    price: 'IDR 1.800.000',
    originalPrice: 'IDR 2.500.000',
  },
  {
    id: 8,
    href: '/produk/detail',
    imgSrc: '/images/cropped-Gambar8.webp',
    alt: 'Sale Product 8',
    name: 'BAJU H',
    price: 'IDR 1.800.000',
    originalPrice: 'IDR 2.500.000',
  },
];

export default function ProdukPage() {
  return (
    <div className={styles.produkSale}>
      <h2>Our Products</h2>

      <div className={styles.produkContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.produkCard}>
            <Link href={product.href} className={styles.produkImageLink}>
              <Image
                src={product.imgSrc}
                alt={product.alt}
                width={400}
                height={533}
              />
              <h3>{product.name}</h3>
              <p className={styles.price}>
                {product.price}
                <span className={styles.originalPrice}>
                  {product.originalPrice}
                </span>
              </p>
            </Link>
            <Link href="/wishlist" className={styles.addToCart}>
              Add to Cart
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}