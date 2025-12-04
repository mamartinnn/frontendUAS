'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '@/app/actions/cart';
import styles from './detail.module.css';

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
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isPending, setIsPending] = useState(false);
  
  const images = [product.image, product.image, product.image];
  const sizes = ['S', 'M', 'L', 'XL'];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleAddToCart = async () => {
    setIsPending(true);
    await addToCart(product.id, selectedSize);
    setIsPending(false);
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
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextBtn}`} aria-label="Next Slide">
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
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
          <button 
            onClick={handleAddToCart} 
            disabled={isPending}
            className={styles.addToCart}
          >
            {isPending ? 'Adding...' : `Add to Cart - Size ${selectedSize}`}
          </button>
          
          <Link href="/produk" className={styles.backButton}>
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}