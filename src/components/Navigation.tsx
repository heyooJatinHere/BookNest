import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, BookOpen, Search, User } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { AuthModal } from './AuthModal';
import { Button } from './ui/Button';

export const Navigation: React.FC = () => {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuthStore();

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <BookOpen className="h-6 w-6 text-blue-600 animate-float" />
              <span className="text-xl font-bold logo-text">BookNest</span>
            </Link>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <Link
                to="/books"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300"
              >
                Browse
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {user.email?.split('@')[0]}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              )}
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white animate-pulse-slow">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};