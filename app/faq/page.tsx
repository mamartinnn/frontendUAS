'use client'
import { useState } from "react";

const faqData = [
  {
    question: 'Bagaimana cara melakukan pemesanan?',
    answer: 'Anda bisa memilih produk, menambahkannya ke keranjang, dan melanjutkan ke checkout...',
  },
  {
    question: 'Apa saja metode pembayaran yang diterima?',
    answer: 'Kami menerima transfer bank, kartu kredit, dan e-wallet...',
  },
  {
    question: 'Berapa lama waktu pengiriman?',
    answer: 'Waktu pengiriman estimasi 3-5 hari kerja untuk Jabodetabek dan 5-10 hari untuk luar Jabodetabek.',
  },
];

export default function FAQPage() {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
        Frequently Asked Questions (FAQ)
      </h1>

      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item" style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
            <button
              onClick={() => handleItemClick(index)}
              className="faq-trigger"
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{item.question}</span>
              <span>{openItemIndex === index ? '-' : '+'}</span>
            </button>

            {openItemIndex === index && (
              <div className="faq-content" style={{ padding: '1rem 0 0 0', color: '#333' }}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}