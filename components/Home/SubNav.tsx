import React from 'react';

interface SubNavProps {
  categories: string[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  isDarkMode: boolean;
}

const SubNav: React.FC<SubNavProps> = ({ 
  categories, 
  currentCategory, 
  setCurrentCategory, 
  isDarkMode 
}) => {
  if (!categories || categories.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCurrentCategory(category)}
          className={`
            px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
            ${currentCategory === category 
              ? 'bg-blue-500 text-white shadow-sm' 
              : isDarkMode 
                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }
          `}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default SubNav;