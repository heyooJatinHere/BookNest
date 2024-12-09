import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some books to get started!</p>
        <Button onClick={() => window.location.href = '/books'}>
          Browse Books
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ book, quantity }) => (
            <div
              key={book.id}
              className="flex gap-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-24 w-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-sm font-medium text-gray-900 mt-2">
                  {formatPrice(book.price)}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(book.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(book.id, quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(book.id, quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between">
              <span className="text-lg font-medium">Total</span>
              <span className="text-lg font-bold">{formatPrice(total)}</span>
            </div>
          </div>
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};