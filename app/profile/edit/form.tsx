'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../profile.module.css';
import { updateProfile } from '@/app/actions/auth';

interface UserProps {
  name: string | null;
  email: string;
  image: string | null;
}

export default function EditProfileForm({ user }: { user: UserProps }) {
  const [avatarPreview, setAvatarPreview] = useState(user.image || '/images/user.png');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form 
      className={styles.editForm} 
      action={async (formData) => {
        await updateProfile(formData);
      }}
    >
      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>Full Name</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          className={styles.input}
          defaultValue={user.name || ''}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          className={styles.input}
          defaultValue={user.email}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="avatar" className={styles.label}>Profile Picture</label>
        <input 
          type="file" 
          id="avatar" 
          name="avatar"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleImageChange}
        />
        <Image 
          src={avatarPreview} 
          alt="Avatar Preview" 
          width={100} 
          height={100} 
          className={styles.avatar}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>New Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          className={styles.input}
          placeholder="Leave blank to keep current password"
        />
      </div>

      <button type="submit" className={styles.saveButton}>Save Changes</button>
    </form>
  );
}