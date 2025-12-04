'use client';

import { useState } from 'react';
import styles from "./halaman.module.css";
import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await registerUser(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} action={handleSubmit}>
        <h1 className={styles.title}>Create Account</h1>

        {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="username">
            Username <span style={{ color: 'red' }}>*</span>
          </label>
          <input type="text" id="username" name="username" className={styles.input} required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">
            Email address <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className={styles.input} 
            placeholder="example@gmail.com"
            required 
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone">
            Phone number (Harus angka) <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            className={styles.input} 
            pattern="[0-9]*" 
            required 
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">
            Password (Minimal 6 karakter) <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className={styles.input} 
            minLength={6}
            required 
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">
            Confirm Password <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            className={styles.input} 
            minLength={6}
            required 
          />
        </div>

        <button type="submit" className={styles.registerButton}>
          Register
        </button>
      </form>
    </div>
  );
}