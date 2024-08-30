import React, { useState, ReactNode } from 'react';

interface CategoryDropDownProps {
  children: ReactNode[];
  category: { childCategories: { slug: { current: string }, title: string }[] };
  handleCategoriesSelected: (selectedActivities: string[]) => void;
  selectedCategories: string[]; // Added this line
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({ selectedCategories, category, handleCategoriesSelected }) => {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([...selectedCategories]);
  const [isVisible, setIsVisible] = useState(true);

  const handleClearAll = () => {
    setSelectedActivities([]);
  }

  const handleCheckboxChange = (activitySlug: string) => {
    setSelectedActivities(prevState =>
      prevState.includes(activitySlug)
        ? prevState.filter(item => item !== activitySlug)
        : [...prevState, activitySlug]
    );
  };

  const handleCloseClick = () => {
    setIsVisible(false);
    if (selectedActivities.length > 0) {
      handleCategoriesSelected(selectedActivities);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-xs" style={{ zIndex: 9999 }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-teal-600">ADVENTURE</h2>
        <button className="text-xl font-bold text-gray-600" onClick={handleCloseClick}>&times;</button>
      </div>
      <div className="space-y-2">
        {category && category.childCategories.map((childCategory: any, index: number) => {
          return (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-[#079EA5]"
                checked={selectedActivities.includes(childCategory.slug.current)}
                onChange={() => handleCheckboxChange(childCategory.slug.current)}
              />
              {childCategory.title} {/* Use the string directly */}
            </label>
          );
        })}
      </div>
      <button className="mt-4 w-full py-2 bg-white border border-black rounded-lg flex items-center justify-between px-4">
        <span className="font-bold">BE INSPIRED</span>
        <span className="font-bold text-teal-600">Adventure</span>
        <span className="text-xl font-bold text-teal-600">&rarr;</span>
      </button>
    </div>
  );
};

export default CategoryDropDown;
