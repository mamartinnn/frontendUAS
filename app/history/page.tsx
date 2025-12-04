import React from 'react';
import styles from './history.module.css';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    redirect('/signin');
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTanggal = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusClass = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('selesai') || s.includes('delivered')) return styles.statusSuccess;
    if (s.includes('dikirim') || s.includes('shipped')) return styles.statusPrimary;
    return styles.statusDefault;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Riwayat Pembelian</h1>

      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Belum ada riwayat pembelian.</p>
          <Link href="/produk" className={styles.linkBrowse}>
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              
              <div className={styles.header}>
                <div className={styles.headerInfo}>
                  <span className={styles.orderId}>
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className={styles.orderDate}>
                    {formatTanggal(order.createdAt)}
                  </span>
                </div>
                <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className={styles.itemsContainer}>
                {order.items.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <div className={styles.imageWrapper}>
                      <img 
                        src={item.image || '/images/placeholder.png'} 
                        alt={item.name} 
                        className={styles.productImage} 
                      />
                    </div>
                    
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemQty}>{item.quantity} x {formatRupiah(item.price)}</p>
                    </div>

                    <div className={styles.itemTotal}>
                      {formatRupiah(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.footer}>
                <div className={styles.totalWrapper}>
                  <span className={styles.totalLabel}>Total Pesanan</span>
                  <span className={styles.totalPrice}>
                    {formatRupiah(order.total)}
                  </span>
                </div>
                
                <div className={styles.actionButtons}>
                  <Link href="/produk" className={`${styles.btn} ${styles.btnOutline}`}>
                    Beli Lagi
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}