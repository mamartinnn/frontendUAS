'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './signin.module.css';
import { loginUser } from '@/app/actions/auth';

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await loginUser(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign In</h1>
        
        {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <form action={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email address <span style={{ color: 'red' }}>*</span>
            </label>
            <input 
              className={styles.input} 
              type="email" 
              id="email" 
              name="email"
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input 
              className={styles.input} 
              type="password" 
              id="password" 
              name="password"
              required 
            />
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

        <p className={styles.linkText}>
          Don&apos;t have an account? <Link href="/signup" style={{ textDecoration: 'underline', color: 'black' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
