'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './CartPage.module.css';
import Header from '@/components/Header/Header';
import { useCartStore } from '../store/cartStore';
import CartItem from '@/components/CartItem/CartItem';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPrice = getTotalPrice();

  if (!mounted) {
    return (
      <div className={styles.cartPage}>
        <Header />
          <LoadingSpinner/>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <Header />

      <main className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <Link
            href="/"
            className={styles.backLink}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.backIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Categories
          </Link>

          <h1 className={styles.cartTitle}>
            Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.emptyCartIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className={styles.emptyCartTitle}>
              Your cart is empty
            </h2>
            <p className={styles.emptyCartText}>
              Start shopping to add items to your cart
            </p>
            <Link
              href="/"
              className={styles.browseButton}
            >
              Browse Categories
            </Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            <div className={styles.cartItems}>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div>
              <div className={styles.orderSummary}>
                <h2 className={styles.orderSummaryTitle}>
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className={styles.summaryRow}>
                    <span>Items ({items.length})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className={styles.summaryDivider}>
                    <div className={styles.totalRow}>
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  className={styles.checkoutButton}
                  disabled
                >
                  Checkout (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
