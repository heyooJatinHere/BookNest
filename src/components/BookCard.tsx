import React from 'react';
import { Book } from '../types/book';
import { Button } from './ui/Button';
import { formatPrice } from '../lib/utils';
import { Star } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="book-card group relative rounded-lg border p-4 bg-white">
      <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{book.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{book.author}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {formatPrice(book.price)}
        </p>
      </div>
      <div className="mt-2 flex items-center">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <span className="ml-1 text-sm text-gray-600">
          {book.rating} ({book.reviewCount} reviews)
        </span>
      </div>
      <Button
        onClick={() => addItem(book)}
        className="mt-4 w-full transform transition-transform duration-300 hover:scale-105"
        variant="primary"
      >
        Add to Cart
      </Button>
    </div>
  );
};