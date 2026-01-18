'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './CartItem.module.css';
import { useCartStore } from '@/app/store/cartStore';
import { CartItem as CartItemType } from '../../app/lib/types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [imageError, setImageError] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const subtotal = product.price * quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemImageContainer}>
        {!imageError && product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={styles.cartItemImage}
            onError={() => setImageError(true)}
            sizes="96px"
          />
        ) : (
          <div className={styles.cartItemImagePlaceholder}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.cartItemImageIcon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className={styles.cartItemContent}>
        <h3 className={styles.cartItemTitle}>
          {product.title}
        </h3>
        <p className={styles.cartItemPrice}>
          ${product.price.toFixed(2)} each
        </p>

        <div className={styles.cartItemControls}>
          <div className={styles.quantityControls}>
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className={styles.quantityButton}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className={styles.quantityInput}
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className={styles.quantityButton}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <p className={styles.cartItemSubtotal}>
            ${subtotal.toFixed(2)}
          </p>

          <button
            onClick={() => removeItem(product.id)}
            className={styles.removeButton}
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
