'use client';

import { useTransition } from 'react';
import { deleteProduct } from '@/app/actions/product';
import styles from './admin.module.css';

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      startTransition(async () => {
        await deleteProduct(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={styles.deleteButton}
      aria-label="Delete Product"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}