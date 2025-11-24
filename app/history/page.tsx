'use client';

import React, { useEffect, useState } from 'react';

type ProductItem = {
  name: string;
  qty: number;
  price: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  status: 'Selesai' | 'Sedang Dikirim' | 'Diproses';
  total: number;
  items: ProductItem[];
};

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch('/api/riwayat');
        const data = await response.json();
        
        setOrders(data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'status-success';
      case 'Sedang Dikirim': return 'status-primary';
      default: return 'status-default';
    }
  };

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Memuat riwayat...</div>;
  }

  return (
    <div className="history-container">
      <h1 className="page-title">Riwayat Pembelian</h1>

      {orders.length === 0 && (
        <p>Belum ada riwayat pembelian.</p>
      )}

      <div className="order-list">
        {/* Render data dari State 'orders', bukan variabel dummy lagi */}
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            
            {/* Header */}
            <div className="order-header">
              <div className="order-info">
                <span className="order-id">ID Pesanan: {order.id}</span>
                <span className="order-date">Tanggal: {order.date}</span>
              </div>
              <span className={`status-badge ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="item-row">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-qty">Jumlah: {item.qty}</p>
                  </div>
                  <div className="item-price">${item.price}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="order-footer">
              <div className="total-section">
                <span>Total: </span>
                <span className="total-price">${order.total}</span>
              </div>
              
              <div className="action-buttons">
                {order.status === 'Selesai' && (
                  <>
                    <button className="btn btn-outline">Beli Lagi</button>
                    <button className="btn btn-dark">Beri Ulasan</button>
                  </>
                )}
                {order.status === 'Sedang Dikirim' && (
                    <button className="btn btn-primary">Lacak Paket</button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}