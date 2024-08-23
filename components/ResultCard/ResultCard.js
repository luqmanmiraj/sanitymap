import React from 'react';

const ResultCard = ({ title, description, image, rating, price }) => {
  return (
    <div className="result-card bg-white rounded-lg shadow-md overflow-hidden m-4">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 bg-white px-2 py-1 m-2 rounded-full">
          <span className="text-yellow-500">★</span> {rating}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-teal-500 font-bold">${price}</span>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
