'use client';

import { updateCartQuantity } from '@/app/actions/cart';
import styles from './wishlist.module.css';

interface Props {
  id: string;
  quantity: number;
}

export default function QuantitySelector({ id, quantity }: Props) {
  return (
    <input 
      type="number" 
      defaultValue={quantity}
      min="1"
      className={styles.quantityInput}
      onChange={(e) => {
        const val = parseInt(e.target.value);
        if (val > 0) {
          updateCartQuantity(id, val);
        }
      }}
    />
  );
}