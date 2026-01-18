import { Category, Product } from "./types";

const API_BASE_URL = 'https://fakestoreapi.com';

export async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`)
        if(!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`)
        }
        return await response.json()
    } catch(error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export async function getCategoryProducts(categoryName: string): Promise<Product[]> {
    try {
      const encodedCategory = encodeURIComponent(categoryName);
      const response = await fetch(`${API_BASE_URL}/products/category/${encodedCategory}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products for category ${categoryName}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching products for category ${categoryName}:`, error);
      throw error;
    }
  }