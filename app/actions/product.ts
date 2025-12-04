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
  
  const imageFiles = formData.getAll('imageUpload') as File[];
  const validImages = imageFiles.filter(file => file.size > 0);
  const finalImages = validImages.slice(0, 10);

  let uploadedPaths: string[] = [];

  if (finalImages.length > 0) {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }

    for (const imageFile of finalImages) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const cleanName = imageFile.name.replace(/[^a-zA-Z0-9.]/g, '');
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${cleanName}`;
        
        await fs.writeFile(path.join(uploadDir, fileName), buffer);
        uploadedPaths.push(`/uploads/${fileName}`);
    }
  } else {
    uploadedPaths.push('/images/placeholder.png');
  }

  const mainImage = uploadedPaths[0];

  await prisma.product.create({
    data: {
      name,
      price,
      origPrice,
      description,
      image: mainImage,
      productImages: {
        create: uploadedPaths.map((path) => ({
            url: path
        }))
      }
    },
  });

  revalidatePath('/produk');
  redirect('/produk');
}