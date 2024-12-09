import React from 'react';
import { Mail, Github } from 'lucide-react';
// import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About BookNest</h3>
            <p className="text-gray-600">
              Your one-stop destination for discovering, exploring, and purchasing books across all genres.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:booknest@gmail.com" className="hover:text-blue-600">
                  booknest@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contributors</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Github className="h-5 w-5 mr-2" />
                <span>Raj Arya Pal</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Github className="h-5 w-5 mr-2" />
                <span>Madhav</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Github className="h-5 w-5 mr-2" />
                <span>Jatin</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Github className="h-5 w-5 mr-2" />
                <span>Jayant</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} BookNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};