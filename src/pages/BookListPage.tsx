import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { BookCard } from '../components/BookCard';
import { searchBooks } from '../services/books';
import { Book } from '../types/book';

export const BookListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('popular books');
  const [genre, setGenre] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const { data: books = [], isLoading } = useQuery(
    ['books', searchQuery],
    () => searchBooks(searchQuery),
    { keepPreviousData: true }
  );
  

  const filteredBooks = books
    .filter((book: Book) => 
      genre === 'all' || book.genre.toLowerCase().includes(genre.toLowerCase())
    )
    .sort((a: Book, b: Book) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const genres = Array.from(
    new Set(books.map((book: Book) => book.genre))
  ).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Books</h1>
        <div className="flex flex-wrap gap-4">
          <select
            className="rounded-md border border-gray-300 py-2 px-4"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="all">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <select
            className="rounded-md border border-gray-300 py-2 px-4"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};