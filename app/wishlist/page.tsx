import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { removeFromCart } from '@/app/actions/cart';
import styles from './wishlist.module.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import QuantitySelector from './quantity-selector';

export const dynamic = 'force-dynamic';

export default async function WishlistPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    redirect('/signin');
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const subtotal = cartItems.reduce(
    (acc: number, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div></div>
        <div className={styles.headerItem}>Product</div>
        <div className={styles.headerItem}>Price</div>
        <div className={styles.headerItem}>Quantity</div>
        <div className={styles.headerItem}>Total</div>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <form action={removeFromCart.bind(null, item.id)}>
            <button type="submit" className={styles.removeButton} aria-label="Remove item">
              ×
            </button>
          </form>
          
          <div className={styles.productDetail}>
            <Image 
              src={item.product.image} 
              alt={item.product.name} 
              width={80} 
              height={80} 
              className={styles.productImage} 
            />
            <div className={styles.productInfo}>
              <span className={styles.productName}>{item.product.name}</span>
              <span className={styles.productSize}>Size: {item.size}</span>
            </div>
          </div>

          <div className={styles.price}>
            IDR {item.product.price.toLocaleString('id-ID')}
          </div>
          
          <div>
            <QuantitySelector id={item.id} quantity={item.quantity} />
          </div>

          <div className={styles.totalPrice}>
            IDR {(item.product.price * item.quantity).toLocaleString('id-ID')}
          </div>
        </div>
      ))}

      {cartItems.length === 0 && (
        <div className={styles.emptyCart}>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/produk" className={styles.startShoppingLink}>
            Start Shopping
          </Link>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className={styles.summary}>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span className={styles.subtotalValue}>IDR {subtotal.toLocaleString('id-ID')}</span>
          </div>

          <div className={styles.summaryRow}>
            <span className={styles.grandTotal}>Total</span>
            <span className={styles.grandTotal}>IDR {subtotal.toLocaleString('id-ID')}</span>
          </div>

          <Link href={`/payment?price=${subtotal}`} className={styles.checkoutButton}>
            Proceed to checkout
          </Link>

        </div>
      )}
    </div>
  );
}