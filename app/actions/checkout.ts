'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function processCheckout(totalAmount: number) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    redirect('/signin');
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    return { error: 'Keranjang kosong' };
  }

  const order = await prisma.order.create({
    data: {
      userId,
      total: totalAmount,
      status: 'Selesai',
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
      },
    },
  });

  await prisma.cartItem.deleteMany({
    where: { userId },
  });

  revalidatePath('/history');
  revalidatePath('/wishlist');
  
  return { success: true, orderId: order.id };
}