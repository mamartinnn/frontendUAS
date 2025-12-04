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
    where: { userId },
    include: {
      items: true, 
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Selesai': 
      case 'Delivered': 
        return styles.statusSuccess;
      case 'Sedang Dikirim': 
        return styles.statusPrimary; 
      default: 
        return styles.statusDefault;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Riwayat Pembelian</h1>

      {orders.length === 0 ? (
        <p style={{textAlign: 'center', color: '#666'}}>Belum ada riwayat pembelian.</p>
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              
              <div className={styles.header}>
                <div>
                  <div className={styles.orderId}>ID Pesanan: #{order.id.slice(0, 8).toUpperCase()}</div>
                  <span className={styles.orderDate}>
                    {order.createdAt.toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div>
                {order.items.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <div className={styles.imageContainer}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className={styles.productImage} 
                      />
                    </div>
                    
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemQty}>Jumlah: {item.quantity} item</p>
                    </div>

                    <div className={styles.itemPrice}>
                      IDR {item.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.footer}>
                <div>
                  <span className={styles.totalLabel}>Total Belanja:</span>
                  <span className={styles.totalPrice}>IDR {order.total.toLocaleString('id-ID')}</span>
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