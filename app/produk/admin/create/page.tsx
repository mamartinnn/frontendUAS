'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './create.module.css';
import { createProduct } from '@/app/actions/product';

export default function CreateProductPage() {
  const [preview, setPreview] = useState<string>('/images/placeholder.jpg');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form action={createProduct} className={styles.formContainer}>
      <div className={styles.imageSection}>
        <Image 
          src={preview} 
          alt="Preview" 
          width={400} 
          height={600} 
          className={styles.previewImage} 
        />
        <label htmlFor="imageUpload" className={styles.uploadBtn}>
          Choose Image
        </label>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          hidden
          required
        />
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Product Name</label>
          <input name="name" className={styles.inputText} placeholder="Ex: Black T-Shirt" required autoComplete="off" />
        </div>

        <div className={styles.row}>
          <div className={`${styles.inputGroup} ${styles.flexItem}`}>
            <label className={styles.label}>Sale Price (IDR)</label>
            <input name="price" type="number" className={styles.inputText} placeholder="150000" required />
          </div>
          <div className={`${styles.inputGroup} ${styles.flexItem}`}>
            <label className={styles.label}>Original Price (IDR)</label>
            <input name="origPrice" type="number" className={styles.inputText} placeholder="200000" required />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Description</label>
          <textarea name="description" className={styles.textArea} placeholder="Product details..." required />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Publish Product
        </button>
      </div>
    </form>
  );
}