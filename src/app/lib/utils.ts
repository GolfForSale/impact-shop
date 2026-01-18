const CATEGORY_CONFIG = {
  'mens-clothing': {
    slug: 'mens-clothing',
    displayName: "Men's Clothing",
    apiName: "men's clothing"
  },
  'womens-clothing': {
    slug: 'womens-clothing',
    displayName: "Women's Clothing",
    apiName: "women's clothing"
  },
  'jewelery': {
    slug: 'jewelery',
    displayName: 'Jewelery',
    apiName: 'jewelery'
  },
  'electronics': {
    slug: 'electronics',
    displayName: 'Electronics',
    apiName: 'electronics'
  }
};

type CategorySlug = keyof typeof CATEGORY_CONFIG;

export function isValidCategorySlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  return slug.toLowerCase() in CATEGORY_CONFIG;
}

export function slugToCategory(slug: string): string {
  if (!slug || typeof slug !== 'string') return '';

  const category = CATEGORY_CONFIG[slug.toLowerCase() as CategorySlug];
  return category?.apiName || slug;
}

export function slugToDisplayName(slug: string): string {
  if (!slug || typeof slug !== 'string') return '';

  const category = CATEGORY_CONFIG[slug.toLowerCase() as CategorySlug];

  if (category) {
    return category.displayName;
  }

  return slug
    .split(/[-\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function categoryToSlug(categoryName: string): string {
  if (!categoryName || typeof categoryName !== 'string') return categoryName;

  const category = Object.values(CATEGORY_CONFIG).find(
    cat => cat.apiName.toLowerCase() === categoryName.toLowerCase()
  );

  return category?.slug ?? categoryName.toLowerCase().replace(/\s+/g, '-');
}
