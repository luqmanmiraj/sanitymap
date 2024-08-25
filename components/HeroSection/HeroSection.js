import React, { useState } from 'react';
import './HeroSection.css';
import CategoryDropDown from '../CategoryDropDown/CategoryDropDown';

const HeroSection = ({categories}) => {
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedCategoryChildren, setSelectedCategoryChildren] = useState([]);

  const handleCategoryClick = (category, event) => {
    console.log(category._id);
    const rect = event.target.getBoundingClientRect();
    setDropdownPosition({ top: rect.bottom, left: rect.left });
    console.log(rect);
    setVisibleCategory(visibleCategory === category._id ? false : category._id);
    setSelectedCategoryChildren(category.childCategories || []);
  };

  return (
    <section className="hero bg-cover bg-center relative" style={{ backgroundColor: '#FFFFFF', height: '122px' }}>
      <div className="overlay absolute inset-0 flex flex-col justify-center items-center text-white">
        <div className="category-icons flex overflow-x-auto whitespace-nowrap gap-1 pb-4 w-full px-4 justify-center items-center"> {/* Adjusted gap and removed md:flex-wrap */}
          {categories.map((category) => (
            <React.Fragment key={category._id}>
              <span id={category._id} className={`bg-white text-gray-800 py-2 px-4 rounded-full flex flex-col items-center flex-shrink-0 ${category.slug.current}`} onClick={(event) => handleCategoryClick(category, event)}>
                {category.description && (
                  <div dangerouslySetInnerHTML={{ __html: category.description }} />
                )}
                <span className="mt-2">{category.title}</span>
              </span>
              {visibleCategory === category._id && (
                <div style={{ position: 'fixed', top: dropdownPosition.top, left: dropdownPosition.left, zIndex: 9999, color: 'black' }}>
                  <CategoryDropDown category={category} />
                </div>
              )}
            </React.Fragment>
          ))}

          <span className="search-icon flex items-center justify-center">
            <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="0.5" width="47" height="47" rx="23.5" fill="white"/>
              <rect x="1" y="0.5" width="47" height="47" rx="23.5" stroke="#E0E0E1"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M22.5 14C18.0817 14 14.5 17.5817 14.5 22C14.5 26.4183 18.0817 30 22.5 30C24.3487 30 26.051 29.3729 27.4056 28.3199L32.7929 33.7071L32.8871 33.7903C33.2794 34.0953 33.8466 34.0676 34.2071 33.7071C34.5976 33.3166 34.5976 32.6834 34.2071 32.2929L28.8199 26.9056C29.8729 25.551 30.5 23.8487 30.5 22C30.5 17.5817 26.9183 14 22.5 14ZM22.5 16C25.8137 16 28.5 18.6863 28.5 22C28.5 25.3137 25.8137 28 22.5 28C19.1863 28 16.5 25.3137 16.5 22C16.5 18.6863 19.1863 16 22.5 16Z" fill="#77787C"/>
            </svg>
          </span>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
