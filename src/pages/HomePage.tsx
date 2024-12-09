import React from 'react';
import { useQuery } from 'react-query';
import { BookOpen, Users, BookMarked, Award } from 'lucide-react';
import { getFeaturedBooks } from '../services/books';
import { BookCard } from '../components/BookCard';

export const HomePage: React.FC = () => {
  const { data: featuredBooks = [], isLoading } = useQuery(
    'featuredBooks',
    getFeaturedBooks
  );

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to BookNest
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover your next favorite book from our vast collection of titles
          across all genres.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: BookOpen,
            title: 'Vast Collection',
            description: 'Over 1 million books across all genres',
          },
          {
            icon: Users,
            title: 'Community',
            description: 'Join discussions with fellow book lovers',
          },
          {
            icon: BookMarked,
            title: 'Digital Library',
            description: 'Access e-books and digital content',
          },
          {
            icon: Award,
            title: 'Expert Picks',
            description: 'Curated selections by literary experts',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm"
          >
            <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured books...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredBooks.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};