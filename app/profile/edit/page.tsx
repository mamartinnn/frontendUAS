'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../profile.module.css'; // Menggunakan CSS yang sama

export default function EditProfilePage() {
  const router = useRouter();
  

  const [name, setName] = useState('Martin');
  const [email, setEmail] = useState('martin@example.com');
  const [avatarPreview, setAvatarPreview] = useState('/images/RobloxScreenShot20250924_171224509.png');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    alert('Profile updated successfully!');
    router.push('/profile'); 
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Edit Your Profile</h2>
        <form className={styles.editForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input 
              type="text" 
              id="name" 
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input 
              type="email" 
              id="email" 
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="avatar" className={styles.label}>Profile Picture</label>
            <input 
              type="file" 
              id="avatar" 
              accept="image/*"
              className={styles.fileInput}
              onChange={handleImageChange}
            />

            <Image 
              src={avatarPreview} 
              alt="Avatar Preview" 
              width={100} 
              height={100} 
              className={styles.avatarPreview}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>New Password</label>
            <input 
              type="password" 
              id="password" 
              className={styles.input}
              placeholder="Leave blank to keep current password"
            />
          </div>

          <button type="submit" className={styles.saveButton}>Save Changes</button>
        </form>

      </div>
    </div>
  );
}