'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  
  const MAX_INT = 2147483647;
  const rawPrice = parseInt(formData.get('price') as string) || 0;
  const rawOrigPrice = parseInt(formData.get('origPrice') as string) || 0;
  const price = rawPrice > MAX_INT ? MAX_INT : rawPrice;
  const origPrice = rawOrigPrice > MAX_INT ? MAX_INT : rawOrigPrice;
  
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
    uploadedPaths.push('/images/placeholder.jpg');
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
  revalidatePath('/produk/admin');
  redirect('/produk/admin');
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { productImages: true }
  });

  if (product) {
    for (const img of product.productImages) {
        if (img.url.startsWith('/uploads/')) {
            const filePath = path.join(process.cwd(), 'public', img.url);
            try {
                await fs.unlink(filePath);
            } catch (error) {
                console.error('File not found or cannot be deleted:', filePath);
            }
        }
    }

    await prisma.product.delete({
      where: { id },
    });
  }

  revalidatePath('/produk');
  revalidatePath('/produk/admin');
}

export async function updateProduct(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    const MAX_INT = 2147483647;
    const rawPrice = parseInt(formData.get('price') as string) || 0;
    const rawOrigPrice = parseInt(formData.get('origPrice') as string) || 0;
    const price = rawPrice > MAX_INT ? MAX_INT : rawPrice;
    const origPrice = rawOrigPrice > MAX_INT ? MAX_INT : rawOrigPrice;

    await prisma.product.update({
        where: { id },
        data: {
            name,
            price,
            origPrice,
            description,
        }
    });

    const imageFiles = formData.getAll('imageUpload') as File[];
    const validImages = imageFiles.filter(file => file.size > 0);
    
    if (validImages.length > 0) {
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        let newPaths: string[] = [];

        for (const imageFile of validImages) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const cleanName = imageFile.name.replace(/[^a-zA-Z0-9.]/g, '');
            const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${cleanName}`;
            
            await fs.writeFile(path.join(uploadDir, fileName), buffer);
            newPaths.push(`/uploads/${fileName}`);
        }

        await prisma.product.update({
            where: { id },
            data: {
                image: newPaths[0], 
                productImages: {
                    deleteMany: {}, 
                    create: newPaths.map(path => ({ url: path }))
                }
            }
        });
    }

    revalidatePath('/produk');
    revalidatePath(`/produk/${id}`);
    revalidatePath('/produk/admin');
    redirect('/produk/admin');
}