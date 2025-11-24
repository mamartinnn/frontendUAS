'use client'; 

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './payment.module.css';

function PaymentContent() {
  const searchParams = useSearchParams();
  
  // Ambil data dari URL
  const productName = searchParams.get('productName') || 'Produk Tidak Ditemukan';
  const priceString = searchParams.get('price') || '0';
  const price = parseInt(priceString);
  const shippingCost = 20000;
  const total = price + shippingCost;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Bagian Kiri (Metode Pembayaran) - Tetap Sama */}
        <div className={styles.leftColumn}>
            {/* ... kode metode pembayaran & alamat kamu yang sebelumnya ... */}
             <div className={styles.section}>
                <h2>Metode Pembayaran</h2>
                {/* ... input radio button ... */}
             </div>
        </div>

        {/* Bagian Kanan (Ringkasan Belanja DINAMIS) */}
        <div className={styles.rightColumn}>
          <div className={styles.section}>
            <h3 className={styles.heading}>Ringkasan Pesanan</h3>
            
            <div className={styles.summaryRow}>
              {/* Tampilkan Nama Produk dari URL */}
              <span>{productName} (x1)</span> 
              <span>Rp {price.toLocaleString()}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Ongkos Kirim</span>
              <span>Rp {shippingCost.toLocaleString()}</span>
            </div>

            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total Tagihan</span>
              {/* Hitung Total */}
              <span>Rp {total.toLocaleString()}</span>
            </div>

            <button className={styles.payButton} onClick={() => alert('Pembayaran Berhasil!')}>
              Bayar Sekarang
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading data pembayaran...</div>}>
      <PaymentContent />
    </Suspense>
  );
}