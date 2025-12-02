'use client';
import { useState } from 'react';
import styles from './faq.module.css'; 

const faqData = [
  {
    question: 'Bagaimana cara melakukan pemesanan?',
    answer: 'Anda bisa memilih produk, menambahkannya ke keranjang, lalu checkout dan melakukan pembayaran.',
  },
  {
    question: 'Apa saja metode pembayaran yang diterima?',
    answer: 'Kami menerima berbagai metode pembayaran termasuk transfer bank, kartu kredit, dan e-wallet.',
  },
  {
    question: 'Berapa lama waktu pengiriman?',
    answer: 'Waktu pengiriman estimasi 3-5 hari kerja untuk wilayah Jabodetabek dan 5-10 hari kerja untuk luar Jabodetabek.',
  },
  {
    question: 'Apakah bisa melakukan pengembalian barang?',
    answer: 'Ya, pengembalian barang dapat dilakukan maksimal 3 hari setelah barang diterima dengan syarat tertentu.',
  },
];

export default function FAQPage() {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Frequently Asked Questions (FAQ)</h1>

      <div className={styles.list}>
        {faqData.map((item, index) => {
          const isOpen = openItemIndex === index;

          return (
            <div 
              key={index} 
              className={`${styles.item} ${isOpen ? styles.activeItem : ''}`}
            >
              <button 
                type="button"
                className={styles.question} 
                onClick={() => handleItemClick(index)}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.icon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              <div 
                className={styles.answerWrapper}
                aria-hidden={!isOpen}
              >
                <div className={styles.answerContent}>
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}