'use client';

import Image from 'next/image';
import styles from './wishlist.module.css';

export default function CartPage() {
  return (
    <div className={styles.container}>
      
      <div className={styles.tableHeader}>
        <div></div>
        <div className={styles.headerItem}>Product</div>
        <div className={styles.headerItem}>Price</div>
        <div className={styles.headerItem}>Quantity</div>
        <div className={styles.headerItem}>Total</div>
      </div>

      <div className={styles.cartItem}>
        <button className={styles.removeButton}>×</button>
        
        <div className={styles.productDetail}>
          <img 
            src="/images/.jpg" 
            alt="Soho Top Black" 
            className={styles.productImage} 
          />
          <div className={styles.productInfo}>
            <span className={styles.productName}>Soho Top Black -</span>
            <span className={styles.productSize}>Free Size</span>
          </div>
        </div>

        <div className={styles.price}>IDR 199,000</div>
        
        <div>
          <input type="number" defaultValue={1} className={styles.quantityInput} />
        </div>

        <div className={styles.totalPrice}>IDR 199,000</div>
      </div>

      <div className={styles.cartItem}>
        <button className={styles.removeButton}>×</button>
        
        <div className={styles.productDetail}>
          <img 
            src="/images/.jpg" 
            alt="Frau top Black" 
            className={styles.productImage} 
          />
          <div className={styles.productInfo}>
            <span className={styles.productName}>Frau top Black -</span>
            <span className={styles.productSize}>Free Size</span>
          </div>
        </div>

        <div className={styles.price}>IDR 169,000</div>
        
        <div>
          <input type="number" defaultValue={1} className={styles.quantityInput} />
        </div>

        <div className={styles.totalPrice}>IDR 169,000</div>
      </div>

      <div className={styles.summary}>
        
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span style={{ fontWeight: 500 }}>IDR 368,000</span>
          <span className={styles.saveBadge}>SAVE: IDR 150,000</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.grandTotal}>Total</span>
          <span className={styles.grandTotal}>IDR 368,000</span>
        </div>

        <button className={styles.checkoutButton}>
          Proceed to checkout
        </button>

      </div>

    </div>
  );
}