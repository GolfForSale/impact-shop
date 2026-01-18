import { Category } from "./types";

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