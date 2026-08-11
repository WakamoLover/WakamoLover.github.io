import React from 'react';

interface SubNavProps {
  categories: string[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ 
  categories, 
  currentCategory, 
  setCurrentCategory 
}) => {
  if (!categories || categories.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCurrentCategory(category)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            currentCategory === category 
              ? 'bg-blue-600 text-white shadow-sm font-semibold' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default SubNav;