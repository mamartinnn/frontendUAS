'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './signin.module.css';

export default function SignInPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika login di sini...
    // Jika sukses:
    router.push('/produk');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        {/* Judul menggunakan font Serif sesuai gambar */}
        <h1 className={styles.title}>Sign In</h1>
        
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email address *</label>
            <input 
              className={styles.input} 
              type="email" 
              id="email" 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password *</label>
            <input 
              className={styles.input} 
              type="password" 
              id="password" 
              required 
            />
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

        <p className={styles.linkText}>
          Don't have an account? <Link href="/signup" style={{ textDecoration: 'underline', color: 'black' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}