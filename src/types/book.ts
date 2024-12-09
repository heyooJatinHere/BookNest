export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  isbn: string;
  publishDate: string;
  genre: string;
  rating: number;
  reviewCount: number;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  photo: string;
  books: string[];
}