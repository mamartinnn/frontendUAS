import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import DeleteButton from './delete_btn';
import styles from './admin.module.css';
import Search from '@/app/components/search';

interface Props {
  searchParams?: Promise<{
    query?: string;
  }>;
}

export default async function AdminPage(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <Link href="/produk/admin/create" className={styles.addButton}>
          + Add New Product
        </Link>
      </div>

      <Search placeholder="Cari produk di admin..." />

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.width80}>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                </td>
                <td className={`${styles.tableCell} ${styles.productName}`}>{product.name}</td>
                <td className={styles.tableCell}>IDR {product.price.toLocaleString('id-ID')}</td>
                <td className={`${styles.tableCell} ${styles.actionCell}`}>
                  <Link
                    href={`/produk/admin/edit/${product.id}`}
                    className={styles.editButton}
                  >
                    Edit
                  </Link>
                  <DeleteButton id={product.id} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
                <tr>
                    <td colSpan={4} className={styles.emptyState}>
                        No products found matching &quot;{query}&quot;
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}