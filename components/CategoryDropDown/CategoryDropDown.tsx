import React, { useState, ReactNode } from 'react';

interface CategoryDropDownProps {
  children: ReactNode[];
  category: { childCategories: ReactNode[] }; // Changed this line to make category an object type with a children array
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({ category }) => {
  console.log("category", category);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'Adrenaline',
    'Camping',
    'Cycling & mountain biking',
    'Golfing',
  ]);
  const [isVisible, setIsVisible] = useState(true);

  const handleClearAll = () => {
    setSelectedActivities([]);
  }



  const handleCheckboxChange = (activity: string) => {
    setSelectedActivities(prevState =>
      prevState.includes(activity)
        ? prevState.filter(item => item !== activity)
        : [...prevState, activity]
    );
  };

  const handleCloseClick = () => {
    setIsVisible(false);
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
        {category && category.childCategories.map((category: any, index: number) => {
          // if (React.isValidElement(category) && typeof category.props.title === 'string') {
            return (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  // checked={selectedActivities.includes(child.props.title)}
                  // onChange={() => handleCheckboxChange(child.props.title)}
                />
                {category.title} {/* Use the string directly */}
              </label>
            );
          // }
          return null;
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
