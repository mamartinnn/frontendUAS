'use client'; 

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import styles from './payment.module.css';
import { processCheckout } from '@/app/actions/checkout';

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  
  const productName = searchParams.get('productName') || 'Keranjang Belanja';
  const priceString = searchParams.get('price') || '0';
  const price = parseInt(priceString);
  const shippingCost = 20000;
  const adminFee = 2500;
  const total = price + shippingCost + adminFee;

  const handlePayment = async () => {
    setLoading(true);
    
    const result = await processCheckout(total);

    if (result?.success) {
      alert(`Pembayaran sebesar Rp ${total.toLocaleString()} berhasil!`);
      router.push('/history');
    } else {
      alert('Gagal memproses pesanan. Pastikan keranjang tidak kosong.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        <div className={styles.leftColumn}>
           <div className={styles.section}>
              <h3 className={styles.heading}>Shipping Information</h3>
              
              <div className={styles.row}>
                <div className={`${styles.formGroup} ${styles.col}`}>
                  <label className={styles.label}>First Name</label>
                  <input className={styles.input} type="text" placeholder="Martin" />
                </div>
                <div className={`${styles.formGroup} ${styles.col}`}>
                  <label className={styles.label}>Last Name</label>
                  <input className={styles.input} type="text" placeholder="Garrix" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input className={styles.input} type="email" placeholder="martin@example.com" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Street Address</label>
                <input className={styles.input} type="text" placeholder="Jalan Sudirman No. 10" />
              </div>

              <div className={styles.row}>
                <div className={`${styles.formGroup} ${styles.col}`}>
                  <label className={styles.label}>City</label>
                  <input className={styles.input} type="text" placeholder="Jakarta" />
                </div>
                <div className={`${styles.formGroup} ${styles.col}`}>
                  <label className={styles.label}>Postal Code</label>
                  <input className={styles.input} type="text" placeholder="12345" />
                </div>
              </div>
           </div>

           <div className={styles.section}>
              <h3 className={styles.heading}>Payment Method</h3>
              <div className={styles.paymentOptions}>
                <div 
                  className={`${styles.paymentOption} ${paymentMethod === 'credit_card' ? styles.active : ''}`}
                  onClick={() => setPaymentMethod('credit_card')}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className={styles.radioInput} 
                    checked={paymentMethod === 'credit_card'} 
                    readOnly 
                  />
                  <span className={styles.optionLabel}>Credit / Debit Card</span>
                </div>

                <div 
                  className={`${styles.paymentOption} ${paymentMethod === 'bank_transfer' ? styles.active : ''}`}
                  onClick={() => setPaymentMethod('bank_transfer')}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className={styles.radioInput} 
                    checked={paymentMethod === 'bank_transfer'} 
                    readOnly 
                  />
                  <span className={styles.optionLabel}>Bank Transfer (Virtual Account)</span>
                </div>

                <div 
                  className={`${styles.paymentOption} ${paymentMethod === 'ewallet' ? styles.active : ''}`}
                  onClick={() => setPaymentMethod('ewallet')}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className={styles.radioInput} 
                    checked={paymentMethod === 'ewallet'} 
                    readOnly 
                  />
                  <span className={styles.optionLabel}>GoPay / OVO / ShopeePay</span>
                </div>
              </div>
           </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.section}>
            <h3 className={styles.heading}>Order Summary</h3>
            
            <div className={styles.summaryRow}>
              <span className={styles.productHighlight}>{productName}</span> 
              <span>Rp {price.toLocaleString()}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Shipping Cost</span>
              <span>Rp {shippingCost.toLocaleString()}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Admin Fee</span>
              <span>Rp {adminFee.toLocaleString()}</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.totalRow}>
              <span>Total Payment</span>
              <span className={styles.totalAmount}>Rp {total.toLocaleString()}</span>
            </div>

            <button 
              className={styles.payButton} 
              onClick={handlePayment}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>

            <div className={styles.secureInfo}>
              🔒 Secure SSL Encryption
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment data...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
