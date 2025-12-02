'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = parseInt(formData.get('price') as string);
  const origPrice = parseInt(formData.get('origPrice') as string);
  const description = formData.get('description') as string;
  const imageFile = formData.get('imageUpload') as File;

  let imagePath = '/images/placeholder.jpg';

  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `${Date.now()}-${imageFile.name}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    await fs.writeFile(path.join(uploadDir, fileName), buffer);
    imagePath = `/uploads/${fileName}`;
  }

  await prisma.product.create({
    data: {
      name,
      price,
      origPrice,
      description,
      image: imagePath,
    },
  });

  revalidatePath('/produk');
  redirect('/produk');
}