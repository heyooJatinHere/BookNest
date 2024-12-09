import axios from 'axios';
import { Book } from '../types/book';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export async function searchBooks(query: string): Promise<Book[]> {
  const response = await axios.get(`${GOOGLE_BOOKS_API}?q=${query}&maxResults=40`);
  
  return response.data.items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.[0] || 'Unknown Author',
    price: item.saleInfo?.listPrice?.amount || 29.99,
    coverImage: item.volumeInfo.imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300&h=400',
    description: item.volumeInfo.description || 'No description available',
    isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || 'Unknown ISBN',
    publishDate: item.volumeInfo.publishedDate || 'Unknown Date',
    genre: item.volumeInfo.categories?.[0] || 'General',
    rating: item.volumeInfo.averageRating || 4.0,
    reviewCount: item.volumeInfo.ratingsCount || 0,
  }));
}

export async function getFeaturedBooks(): Promise<Book[]> {
  const queries = ['bestseller fiction', 'award winning books', 'new releases'];
  const results = await Promise.all(
    queries.map(query => searchBooks(query))
  );
  
  return results.flat().slice(0, 12);
}