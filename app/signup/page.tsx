import styles from "./halaman.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>Create Account</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="username">Username *</label>
          <input type="text" id="username" className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email address *</label>
          <input type="email" id="email" className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone">Phone number</label>
          <input type="tel" id="phone" className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password *</label>
          <input type="password" id="password" className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input type="password" id="confirmPassword" className={styles.input} />
        </div>

        <button type="submit" className={styles.registerButton}>
          Register
        </button>
      </form>
    </div>
  );
}