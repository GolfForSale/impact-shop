'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './ProductCard.module.css';
import { Product } from '@/app/lib/types';
import { useCartStore } from '@/app/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        {!imageError && product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className={styles.productImage}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.productImagePlaceholder}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.productImageIcon}
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

      <div className={styles.productContent}>
        <h3 className={styles.productTitle}>
          {product.title}
        </h3>

        <p className={styles.productPrice}>
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={styles.addToCartButton}
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
