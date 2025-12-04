'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './create.module.css';
import { createProduct } from '@/app/actions/product';

export default function CreateProductPage() {
  const [previews, setPreviews] = useState<string[]>(['/images/placeholder.jpg']);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files.length > 10) {
        alert('Maksimal hanya boleh 10 gambar.');
        e.target.value = ''; 
        return;
      }

      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  return (
    <form action={createProduct} className={styles.formContainer}>
      <div className={styles.imageSection}>
        <div className={styles.previewMain}>
            <Image 
            src={previews[0]} 
            alt="Main Preview" 
            fill
            style={{ objectFit: 'cover' }}
            />
        </div>
        
        {previews.length > 1 && (
            <div className={styles.previewGrid}>
                {previews.map((src, idx) => (
                    <div key={idx} className={`${styles.previewThumb} ${idx === 0 ? styles.active : ''}`}>
                        <Image src={src} alt={`Preview ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                    </div>
                ))}
            </div>
        )}

        <label htmlFor="imageUpload" className={styles.customUploadBtn}>
          Choose Images (Max 10)
        </label>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          accept="image/*"
          multiple
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