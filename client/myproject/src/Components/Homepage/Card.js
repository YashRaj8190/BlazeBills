import React from 'react';

const Card = ({ title, details, imageUrl }) => {
  return (
    <div className="bg-white shadow-md overflow-hidden flex">
      <div className="w-1/3">
        <img src={imageUrl} className="w-full h-auto" />
      </div>
      <div className="w-2/3 p-4 bg-orange-100">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-black-600">{details}</p>
      </div>
    </div>
  );
};

export default Card;
