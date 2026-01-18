import Link from 'next/link';

import styles from './CategoryPage.module.css';
import { isValidCategorySlug, slugToCategory, slugToDisplayName } from '@/app/lib/utils';
import Header from '@/components/Header/Header';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { Product } from '@/app/lib/types';
import { getCategoryProducts } from '@/app/lib/api';
import ProductCard from '@/components/ProductCard/ProductCard';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const isCorrectSlug = isValidCategorySlug(slug)
  if(!isCorrectSlug) {
    return (
      <main className={styles.categoryContainer}>
        <div className={styles.categoryHeader}>
          <Header/>
          <ErrorMessage message="Not valid Category"/>
          <Link href={'/'} className={styles.backLink}>Back to category list</Link>
        </div>
      </main>
    )
  }
  
  const categoryNameForAPI = slugToCategory(slug);
  const categoryNameForDisplay = slugToDisplayName(slug);

  const { products, error } = !categoryNameForAPI
    ? { products: [] as Product[], error: 'Invalid category' }
    : await getCategoryProducts(categoryNameForAPI)
        .then((data) => ({ products: data, error: null }))
        .catch((err) => ({
          products: [] as Product[],
          error: err instanceof Error ? err.message : 'Failed to load products',
        }));

        return (
    <div className={styles.categoryPage}>
      <Header />

      <main className={styles.categoryContainer}>
        <div className={styles.categoryHeader}>
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

          <h1 className={styles.categoryTitle}>
            {categoryNameForDisplay}
          </h1>
          <p className={styles.categoryCount}>
            {error ? '0' : products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {error ? (
          <ErrorMessage message={error} />
        ) : products.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
