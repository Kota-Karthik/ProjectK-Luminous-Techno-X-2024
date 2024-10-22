import React from 'react';

const Card = ({ title, number }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-2">
      <div className="text-gray-700 font-semibold text-sm mb-2">{title}</div>
      <div className="text-2xl font-bold text-blue-500">{number}</div>
    </div>
  );
};

export default Card;
