'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function addToCart(productId: string, size: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    redirect('/signin');
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      productId: productId,
      size: size,
      userId: userId,
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        productId,
        size,
        quantity: 1,
        userId,
      },
    });
  }

  revalidatePath('/wishlist');
  redirect('/wishlist');
}

export async function removeFromCart(id: string) {
  await prisma.cartItem.delete({
    where: { id },
  });
  revalidatePath('/wishlist');
}

export async function updateCartQuantity(id: string, quantity: number) {
  if (quantity < 1) return;
  
  await prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });
  revalidatePath('/wishlist');
}