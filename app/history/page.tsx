'use client';

import React from 'react';
import styles from './history.module.css';

type ProductItem = {
  name: string;
  qty: number;
  price: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  status: 'Selesai' | 'Sedang Dikirim' | 'Diproses' | 'Delivered';
  total: number;
  items: ProductItem[];
};

export default function HistoryPage() {
  
  const orders: Order[] = [
    {
      id: '#DLR-1023',
      date: '15 November 2025',
      status: 'Delivered', 
      total: 129.00,
      items: [
        {
          name: 'Tailored Blazer',
          qty: 1,
          price: 129.00,
          image: '', 
        },
      ],
    },
    {
      id: '#DLR-1018',
      date: '08 November 2025',
      status: 'Delivered', 
      total: 89.00,
      items: [
        {
          name: 'Linen Summer Dress',
          qty: 1,
          price: 89.00,
          image: '',
        },
      ],
    },
  ];

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
                  <div className={styles.orderId}>ID Pesanan: {order.id}</div>
                  <span className={styles.orderDate}>{order.date}</span>
                </div>
                <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div>
                {order.items.map((item, index) => (
                  <div key={index} className={styles.itemRow}>
                    <div className={styles.imageContainer}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className={styles.productImage} 
                      />
                    </div>
                    
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemQty}>Jumlah: {item.qty} item</p>
                    </div>

                    <div className={styles.itemPrice}>
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.footer}>
                <div>
                  <span className={styles.totalLabel}>Total Belanja:</span>
                  <span className={styles.totalPrice}>${order.total.toFixed(2)}</span>
                </div>
                
                <div className={styles.actionButtons}>
                  {(order.status === 'Selesai' || order.status === 'Delivered') && (
                    <>
                      <button className={`${styles.btn} ${styles.btnOutline}`}>
                        Beli Lagi
                      </button>
                      <button className={`${styles.btn} ${styles.btnDark}`}>
                        Beri Ulasan
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}