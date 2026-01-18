export function categoryToSlug(categoryName: string): string {
    return categoryName.toLowerCase().replace(/\s+/g, '-');
  }
  