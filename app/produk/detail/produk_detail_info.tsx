'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './detail.module.css';

const productImages = [
  '/images/cropped-Gambar2.jpg',
  '/images/cropped-Gambar2.jpg',
  '/images/cropped-Gambar2.jpg',
  '/images/cropped-Gambar2.jpg',
];

const availableSizes = ['S', 'M', 'L', 'XL'];

export default function ProductDetailClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSize, setActiveSize] = useState('M');

  return (
    <div className={styles.detailContainer}>
      <div className={styles.productGallery}>
        <div
          className={styles.productImages}
          style={{ transform: `translateX(-${currentSlide * 25}%)` }}
        >
          {productImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Product Image ${index + 1}`}
              width={400}
              height={600}
              priority={index === 0}
            />
          ))}
        </div>

        <div className={styles.imageSliderNav}>
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`${styles.navDot} ${
                currentSlide === index ? styles.active : ''
              }`}
              aria-label={`Go to Image ${index + 1}`}
            >
              <span className={styles.srOnly}>Go to Image {index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.productInfo}>
        <h2>BAJU A</h2>
        <p className={styles.price}>
          IDR 450.000 <span className={styles.originalPrice}>IDR 699.000</span>
        </p>

        <div className={styles.sizeSelection}>
          <h3>Ukuran</h3>
          <div className={styles.sizeButtons}>
            {availableSizes.map((size) => (
              <button
                key={size}
                className={activeSize === size ? styles.active : ''}
                onClick={() => setActiveSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <Link href="/wishlist" className={styles.addToCart}>
          Add to Cart
        </Link>

        <div className={styles.productDescription}>
          <h3>Material & Care</h3>
          <p>
            Terbuat dari 100% premium combed cotton yang lembut dan sejuk. Cuci
            dengan mesin menggunakan air dingin, jangan gunakan pemutih, dan
            setrika dengan suhu rendah.
          </p>
        </div>
      </div>
    </div>
  );
}