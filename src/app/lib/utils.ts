export function categoryToSlug(categoryName: string): string {
    return categoryName.toLowerCase().replace(/\s+/g, '-');
  }
  
  export function slugToCategory(slug: string): string {
    if (!slug) {
      return '';
    }
    
    const slugToApiCategoryMap: Record<string, string> = {
      'mens-clothing': "men's clothing",
      'womens-clothing': "women's clothing",
      'jewelery': 'jewelery',
      'electronics': 'electronics',
    };
    
    const lowerSlug = slug.toLowerCase();
    
    return slugToApiCategoryMap[lowerSlug] || lowerSlug;
  }

  export function slugToDisplayName(slug: string): string {
    if (!slug) {
      return '';
    }
    
    const slugToDisplayMap: Record<string, string> = {
      'mens-clothing': "Men's Clothing",
      'womens-clothing': "Women's Clothing",
      'jewelery': 'Jewelery',
      'electronics': 'Electronics',
    };
    
    const lowerSlug = slug.toLowerCase();
    
    if (slugToDisplayMap[lowerSlug]) {
      return slugToDisplayMap[lowerSlug];
    }
    
    return slug
      .split(/[-\s]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  export const slugify = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/'/g, '')        
      .replace(/\s+/g, '-')     
      .replace(/[^a-z0-9-]/g, '');
  }
  
  export function isValidCategorySlug(slug: string): boolean {
    if (!slug) {
      return false;
    }

    const validSlugs = [
      'mens-clothing',
      'womens-clothing',
      'jewelery',
      'electronics'
    ];

    return validSlugs.includes(slug.toLowerCase());
  }