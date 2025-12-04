import React from 'react';
import styles from './history.module.css';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Memaksa halaman dirender ulang setiap kali dibuka agar data selalu fresh
export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  // 1. Cek User Login via Cookies
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    redirect('/signin');
  }

  // 2. Ambil Data Order dari Database
  // Kita include 'items' karena di schema Anda relasinya bernama 'items'
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

  // Helper untuk warna badge status
  const getStatusClass = (status: string) => {
    // Sesuaikan string ini dengan isi database Anda (misal: "Selesai", "Dikirim")
    switch (status) {
      case 'Selesai': 
      case 'Delivered': 
        return styles.statusSuccess;
      case 'Sedang Dikirim':
      case 'Shipped': 
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
              
              {/* --- HEADER KARTU --- */}
              <div className={styles.header}>
                <div>
                  <div className={styles.orderId}>
                    ID Pesanan: #{order.id.slice(0, 8).toUpperCase()}
                  </div>
                  <span className={styles.orderDate}>
                    {/* Format Tanggal */}
                    {new Date(order.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* --- LIST ITEM BARANG --- */}
              <div>
                {order.items.map((item) => (
                  <div key={item.id} className={styles.itemRow}>
                    <div className={styles.imageContainer}>
                      {/* Menggunakan <img> standar */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className={styles.productImage} 
                      />
                    </div>
                    
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemQty}>Jumlah: {item.quantity}</p>
                    </div>

                    <div className={styles.itemPrice}>
                      {/* Schema Anda menggunakan Int, jadi langsung toLocaleString */}
                      IDR {item.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>

              {/* --- FOOTER KARTU --- */}
              <div className={styles.footer}>
                <div>
                  <span className={styles.totalLabel}>Total Belanja:</span>
                  <span className={styles.totalPrice}>
                    IDR {order.total.toLocaleString('id-ID')}
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