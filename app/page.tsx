'use client'; 

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './home.module.css';

const products = [
  {
    id: 1,
    name: "Red Batik Shirt",
    price: "Rp 200.000",
    image: "/images/1.png",
  },
  {
    id: 2,
    name: "White Batik Shirt",
    price: "Rp 250.000",
    image: "/images/2.png",
  },
  {
    id: 3,
    name: "Brown Batik Shirt",
    price: "Rp 200.000",
    image: "/images/3.png",
  },
  {
    id: 4,
    name: "Swift Batik",
    price: "Rp 300.000",
    image: "/images/4.png",
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowPopup(true);
      setEmail('');
    }
  };

  const currentBgImage = products[currentIndex].image;

  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            Your one-stop-shop for<br />fashionable clothing
          </h1>
          <Image 
            src="/images/5.png" 
            alt="De La Ropa Office" 
            width={960} 
            height={600}
            className={styles.heroImage}
            priority 
          />
          <Link href="/produk" className={styles.heroButton}>
            See Our Product
          </Link>
        </div>
      </section>

      <section 
        className={styles.featuredSection}
        style={{ backgroundImage: `url('${currentBgImage}')` }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.featuredContent}>
          <h2 className={styles.sectionTitle}>Best Sellers</h2>
          <div className={styles.carouselContainer}>
            <button onClick={prevSlide} className={styles.navButton}>&#10094;</button>
            <div className={styles.carouselTrack}>
              <div className={styles.productCard}>
                 <Image 
                    src={products[currentIndex].image} 
                    alt={products[currentIndex].name}
                    width={300}
                    height={380}
                    className={styles.productImage}
                 />
                 <div className={styles.productInfo}>
                   <h3>{products[currentIndex].name}</h3>
                   <p>{products[currentIndex].price}</p>
                 </div>
              </div>
            </div>
            <button onClick={nextSlide} className={styles.navButton}>&#10095;</button>
          </div>
        </div>
      </section>

      <section className={styles.spotlightSection}>
        <div className={styles.spotlightImageContainer}>
          <Image 
            src="/images/6.png" 
            alt="New Collection Model"
            fill
            style={{ objectFit: 'cover' }}
            className={styles.spotlightImage}
          />
        </div>
        <div className={styles.spotlightContent}>
          <span className={styles.spotlightLabel}>NEW ARRIVAL</span>
          <h2 className={styles.spotlightTitle}>The Monochrome<br />Collection</h2>
          <p className={styles.spotlightDesc}>
            Temukan koleksi terbaru kami yang menggabungkan kenyamanan modern dengan sentuhan klasik. Dirancang untuk Anda yang berani tampil beda namun tetap elegan.
          </p>
          <Link href="/produk" className={styles.linkUnderline}>
            DISCOVER MORE
          </Link>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <p>&quot;Produk De La Ropa benar-benar berkualitas. Jahitannya rapi!&quot;</p>
            <span className={styles.customerName}>- Alia, Jakarta</span>
          </div>
          <div className={styles.testimonialCard}>
            <p>&quot;Pengiriman cepat dan packaging-nya premium. Suka banget!&quot;</p>
            <span className={styles.customerName}>- Kevin, Singapore</span>
          </div>
          <div className={styles.testimonialCard}>
            <p>&quot;Setiap kali pakai De La Ropa, saya merasa lebih percaya diri.&quot;</p>
            <span className={styles.customerName}>- Maya, Bali</span>
          </div>
        </div>
      </section>

      <section className={styles.newsletterSection}>
        <h2 className={styles.newsletterTitle}>Join The Community</h2>
        <p className={styles.newsletterDesc}>Dapatkan diskon 10% untuk pembelian pertama Anda.</p>

        <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
          <input 
            type="email" 
            placeholder="Your email address" 
            className={styles.newsletterInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.newsletterButton}>Subscribe</button>
        </form>
      </section>

      {showPopup && (
        <div className={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupIcon}>🎉</div>
            <h3 className={styles.popupTitle}>Thank You!</h3>
            <p className={styles.popupMessage}>
              Anda telah berhasil berlangganan. Kode voucher diskon 10% telah dikirimkan ke email Anda.
            </p>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>
              Okay, Got it!
            </button>
          </div>
        </div>
      )}

    </div>
  );
}