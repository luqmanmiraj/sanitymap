import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import CategoryDropDown from '../CategoryDropDown/CategoryDropDown';

const HeroSection = ({ selectedCategories, categories, handleCategoriesSelected }) => {
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedCategoryChildren, setSelectedCategoryChildren] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [filteredSelectedCategories, setFilteredSelectedCategories] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cat,setCat]=useState({});

  useEffect(() => {
    // Trigger the fade-in animation after component mounts
    if (categories.length > 0) {
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [categories]);

  useEffect(() => {
    if(cat?.childCategories){
      const filteredCategories = selectedCategories.filter(selectedCategory =>
        cat.childCategories.some(childCategory => childCategory.slug.current === selectedCategory)
      );
      setFilteredSelectedCategories(filteredCategories);
    }
  }, [selectedCategories,cat]);

  const handleCategoryClick = (category, event) => {
    console.log(category.childCategories);
    const rect = event.target.getBoundingClientRect();
    setDropdownPosition({ top: rect.bottom, left: rect.left });
    setVisibleCategory(visibleCategory === category._id ? false : category._id);
    setSelectedCategoryChildren(category.childCategories || []);
    setCat(category);
  };

  const handleSearchIconClick = () => {
    setSearchActive(!searchActive);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="hero bg-cover bg-center relative" style={{ backgroundColor: '#FFFFFF', height: '122px' }}>
      <div className="overlay absolute inset-0 flex flex-col justify-center items-center text-white">
        <div className="category-icons flex overflow-x-auto whitespace-nowrap gap-1 pb-4 w-full px-4 justify-center items-center">
          {categories.length > 0 && categories.map((category, index) => (
            <React.Fragment key={category._id} className="relative">
              <span
                id={category._id}
                className={`cursor-pointer hover:bg-[#079EA5] hover:text-white bg-white py-2 px-4 rounded flex flex-col items-center flex-shrink-0 ${category.slug.current} transition-opacity transform ease-in-out duration-150 ${fadeIn ? `opacity-100 ` : 'opacity-0 '} ${visibleCategory === category._id ? 'text-black ' : 'text-gray-600'}`}
                onClick={(event) => handleCategoryClick(category, event)}
                style={{ transitionDelay: `${(index + 1) * 50}ms` }}
              >
                {category.description && (
                  <div dangerouslySetInnerHTML={{ __html: category.description }} />
                )}  
                <span className={`mt-2  font-bold ${visibleCategory === category._id ? 'text-black border-b-4 border-black' : ''}`}>{category.title}</span>
                {
                  filteredSelectedCategories.length > 0 && visibleCategory === category._id && (
                    <div className="absolute top-0 right-0 text-xs font-semibold text-white bg-black flex items-center justify-center" style={{ width: '20px', height: '20px', borderRadius: '50%' }}>
                      {filteredSelectedCategories.length}
                    </div>
                  )
                }
              </span>
              {visibleCategory === category._id && (
                <div style={{ position: 'fixed', top: dropdownPosition.top, left: dropdownPosition.left, zIndex: 9999, color: 'black' }}>
                  <CategoryDropDown selectedCategories={selectedCategories} category={category} handleCategoriesSelected={handleCategoriesSelected} />
                </div>
              )}
            </React.Fragment>
          ))}
          {categories?.length === 0 && (
            <React.Fragment>
              <div className="flex w-[75%] justify-between">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10"></div>
                  <div className="bg-gray-300 animate-pulse h-4 w-16 mt-2"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10"></div>
                  <div className="bg-gray-300 animate-pulse h-4 w-16 mt-2"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10"></div>
                  <div className="bg-gray-300 animate-pulse h-4 w-16 mt-2"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10"></div>
                  <div className="bg-gray-300 animate-pulse h-4 w-16 mt-2"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10"></div>
                  <div className="bg-gray-300 animate-pulse h-4 w-16 mt-2"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10"></div>
                  <div className="bg-gray-300 animate-pulse h-4 w-16 mt-2"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10"></div>
                  <div className="bg-gray-300 animate-pulse h-4 w-16 mt-2"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 animate-pulse rounded-full h-10 w-10"></div>
                  <div className="bg-gray-300 animate-pulse h-4 w-16 mt-2"></div>
                </div>
              </div>
            </React.Fragment>)}

          <div className={` flex items-center cursor-pointer`} >
            <input
              type="text"
              className="ml-2 p-2 border border-gray-300 rounded-full text-black w-full h-[48px]"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              style={{ display: searchActive ? 'block' : 'none' }}
            />
            <span className={`search-icon flex items-center justify-center ${searchActive ? '-ml-12 text-black' : ' text-gray-600'}`} onClick={handleSearchIconClick}>
              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="0.5" width="47" height="47" rx="23.5" fill="none" />
               {!searchActive && <rect x="1" y="0.5" width="47" height="47" rx="23.5" stroke="#E0E0E1" />}
                <path fillRule="evenodd" clipRule="evenodd" d="M22.5 14C18.0817 14 14.5 17.5817 14.5 22C14.5 26.4183 18.0817 30 22.5 30C24.3487 30 26.051 29.3729 27.4056 28.3199L32.7929 33.7071L32.8871 33.7903C33.2794 34.0953 33.8466 34.0676 34.2071 33.7071C34.5976 33.3166 34.5976 32.6834 34.2071 32.2929L28.8199 26.9056C29.8729 25.551 30.5 23.8487 30.5 22C30.5 17.5817 26.9183 14 22.5 14ZM22.5 16C25.8137 16 28.5 18.6863 28.5 22C28.5 25.3137 25.8137 28 22.5 28C19.1863 28 16.5 25.3137 16.5 22C16.5 18.6863 19.1863 16 22.5 16Z" fill="#77787C" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
