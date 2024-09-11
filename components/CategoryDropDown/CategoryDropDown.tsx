import React, { useState, ReactNode, useEffect } from 'react';

interface CategoryDropDownProps {
  category: { childCategories: { slug: { current: string }, title: string }[] , title: string };
  handleCategoriesSelected: (selectedActivities: string[]) => void;
  selectedCategories: string[]; // Added this line
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({ selectedCategories, category, handleCategoriesSelected }) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([...selectedCategories]);
  const [isVisible, setIsVisible] = useState(true);


  const handleClearAll = () => {
    setSelectedActivities([]);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleCheckboxChange = (activitySlug: string) => {
    const newSelectedActivities = [...selectedActivities];
    if (newSelectedActivities.includes(activitySlug)) {
      newSelectedActivities.splice(newSelectedActivities.indexOf(activitySlug), 1);
    } else {
      newSelectedActivities.push(activitySlug);
    }
    setSelectedActivities(newSelectedActivities);
    handleCategoriesSelected(newSelectedActivities);
  };

  const handleCloseClick = () => {
    setIsVisible(false);
    if (selectedActivities.length > 0) {
      handleCategoriesSelected(selectedActivities);
    }
    else {
      handleCategoriesSelected([]);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-xs border-t border-[#079EA5]" style={{ zIndex: 9999 }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-teal-600">{category.title}</h2>
        <button className="text-xl font-bold text-gray-600 hover:text-gray-800" onClick={handleCloseClick}>&times;</button>
      </div>
      <div className="space-y-2">
        {category && category.childCategories.map((childCategory: any, index: number) => {
          return (
            <label key={index} className={`flex items-center ${index !== category.childCategories.length - 1 ? 'border-b border-gray-300 pb-2 mb-2' : ''}`}>
              <input
                type="checkbox"
                className="mr-2 accent-[#079EA5]"
                checked={selectedActivities.includes(childCategory.slug.current)}
                onChange={() => handleCheckboxChange(childCategory.slug.current)}
              />
              {childCategory.title}
            </label>
          );
        })}
      </div>
      <button className="mt-4 w-full py-2 bg-white border border-black rounded-lg flex items-center justify-between px-4">
        <div className="flex flex-col items-start">
          <span className=" text-[14px]">BE INSPIRED</span>
          <span className="font-bold text-black text-[21px]">{category.title}</span>
        </div>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30097 18.2105C6.48079 18.3902 6.74054 18.5 7.01028 18.5L6.99929 18.488C7.25903 18.488 7.51878 18.3782 7.70859 18.1985L7.70959 18.1995L16.0029 9.91196V16.5033C16.0029 17.0524 16.4425 17.5016 17.002 17.5016C17.5514 17.5016 18.001 17.0524 18.001 16.5033V7.51835C18.001 7.29086 17.9266 7.08321 17.8012 6.91692C17.771 6.87556 17.7372 6.83599 17.6998 6.79862C17.4485 6.54806 17.1062 6.45511 16.7898 6.52002L8.01074 6.52002C7.45129 6.52002 7.01172 6.95928 7.01172 7.51835C7.01172 8.06742 7.45129 8.51667 8.01074 8.51667L14.563 8.51667L6.29098 16.7829V16.7929C5.90136 17.1822 5.90136 17.8211 6.30097 18.2105Z" fill="black"/>
        </svg>
      </button>
    </div>
  );
};

export default CategoryDropDown;
