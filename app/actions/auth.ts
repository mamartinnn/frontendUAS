'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';

export async function registerUser(formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!username || !email || !password || !confirmPassword || !phone) {
    return { error: 'Semua field wajib diisi' };
  }

  if (!email.endsWith('@gmail.com')) {
    return { error: 'Email harus menggunakan domain @gmail.com' };
  }

  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(phone)) {
    return { error: 'Nomor HP harus berupa angka' };
  }

  if (password.length < 6) {
    return { error: 'Password minimal 6 karakter' };
  }

  if (password !== confirmPassword) {
    return { error: 'Password tidak cocok' };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: 'Email sudah terdaftar' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      email,
      phone,
      password: hashedPassword,
      name: username,
    },
  });

  redirect('/signin');
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi' };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: 'Email atau password salah' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { error: 'Email atau password salah' };
  }

  const cookieStore = await cookies();
  cookieStore.set('userId', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, 
    path: '/',
  });

  redirect('/produk');
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('userId');
  redirect('/signin');
}

export async function updateProfile(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) redirect('/signin');

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const imageFile = formData.get('avatar') as File;

  const updateData: { name: string; email: string; password?: string; image?: string } = { name, email };

  if (password && password.trim() !== '') {
    if (password.length < 6) return { error: 'Password minimal 6 karakter' };
    updateData.password = await bcrypt.hash(password, 10);
  }

  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `avatar-${userId}-${Date.now()}${path.extname(imageFile.name)}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    
    await fs.writeFile(path.join(uploadDir, fileName), buffer);
    updateData.image = `/uploads/${fileName}`;
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  revalidatePath('/profile');
  redirect('/profile');
}