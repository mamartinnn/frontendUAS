'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../[id]/detail.module.css';

interface ProductData {
  id: string;
  name: string;
  price: number;
  origPrice: number;
  description: string;
  image: string;
}

export default function ProductClient({ product }: { product: ProductData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>('M');
  
  const images = [product.image, product.image, product.image];
  const sizes = ['S', 'M', 'L', 'XL'];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.productGallery}>
        <div className={styles.sliderContainer}>
          <div 
            className={styles.sliderTrack}
            data-slide={currentSlide}
          >
            {images.map((img, index) => (
              <div key={index} className={styles.slide}>
                <Image
                  src={img}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  priority={index === 0}
                  className={styles.mainImage}
                />
              </div>
            ))}
          </div>
        </div>

        <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevBtn}`} aria-label="Previous Slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
          </svg>
        </button>
        <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextBtn}`} aria-label="Next Slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
      </div>

      <div className={styles.productInfo}>
        <h2>{product.name}</h2>
        <p className={styles.price}>
          IDR {product.price.toLocaleString('id-ID')}
          <span className={styles.originalPrice}>
            IDR {product.origPrice.toLocaleString('id-ID')}
          </span>
        </p>

        <div className={styles.sizeSelection}>
          <h3>Ukuran</h3>
          <div className={styles.sizeButtons}>
            {sizes.map((size) => (
              <button
                key={size}
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productDescription}>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div className={styles.actionButtons}>
          <Link href="/wishlist" className={styles.addToCart}>
            Add to Cart {selectedSize && `- size ${selectedSize}`}
          </Link>
          <Link href="/produk" className={styles.backButton}>
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}