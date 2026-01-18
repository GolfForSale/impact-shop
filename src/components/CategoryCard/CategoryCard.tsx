import Link from 'next/link';
import styles from './CategoryCard.module.css';
import { categoryToSlug, slugify } from '@/app/lib/utils';

interface CategoryCardProps {
  category: string;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const slug = categoryToSlug(category);

  return (
    <Link
      href={`/category/${slugify(slug)}`}
      className={styles.categoryCard}
    >
      <h3 className={styles.categoryTitle}>
        {category}
      </h3>
    </Link>
  );
}
