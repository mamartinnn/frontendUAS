'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './wishlist.module.css';

type CartItem = {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};

export default function WishlistPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Soho Top Black',
      size: 'Free Size',
      price: 199000,
      quantity: 1,
      image: '/images/RobloxScreenShot20250924_171224509.png',
    },
    {
      id: 2,
      name: 'Frau top Black',
      size: 'Free Size',
      price: 169000,
      quantity: 1,
      image: '/images/RobloxScreenShot20250924_171224509.png',
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div></div>
        <div className={styles.headerItem}>Product</div>
        <div className={styles.headerItem}>Price</div>
        <div className={styles.headerItem}>Quantity</div>
        <div className={styles.headerItem}>Total</div>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <button 
            className={styles.removeButton} 
            onClick={() => removeItem(item.id)}
          >
            ×
          </button>
          
          <div className={styles.productDetail}>
            <Image 
              src={item.image} 
              alt={item.name} 
              width={80} 
              height={80} 
              className={styles.productImage} 
            />
            <div className={styles.productInfo}>
              <span className={styles.productName}>{item.name} -</span>
              <span className={styles.productSize}>{item.size}</span>
            </div>
          </div>

          <div className={styles.price}>
            IDR {item.price.toLocaleString()}
          </div>
          
          <div>
            <input 
              type="number" 
              value={item.quantity} 
              min="1"
              className={styles.quantityInput} 
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
            />
          </div>

          <div className={styles.totalPrice}>
            IDR {(item.price * item.quantity).toLocaleString()}
          </div>
        </div>
      ))}

      {cartItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Keranjang belanja Anda kosong.
        </div>
      )}

      {cartItems.length > 0 && (
        <div className={styles.summary}>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span style={{ fontWeight: 500 }}>IDR {subtotal.toLocaleString()}</span>
            <span className={styles.saveBadge}>SAVE: IDR 150,000</span>
          </div>

          <div className={styles.summaryRow}>
            <span className={styles.grandTotal}>Total</span>
            <span className={styles.grandTotal}>IDR {subtotal.toLocaleString()}</span>
          </div>

          <Link href={`/payment?price=${subtotal}`} className={styles.checkoutButton}>
            Proceed to checkout
          </Link>

        </div>
      )}

    </div>
  );
}