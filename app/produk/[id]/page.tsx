import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductClient from './productclient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage(props: Props) {
  const params = await props.params;

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) notFound();

  const serializedProduct = {
    ...product,
    createdAt: product.createdAt.toISOString(),
  };

  return <ProductClient product={serializedProduct} />;
}