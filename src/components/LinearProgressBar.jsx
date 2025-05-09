import React from 'react';
import clsx from 'clsx'; // Optional: use for conditional class merging

const LinearProgressBar = ({ value, target = 100, color = 'green' }) => {

const bgColorClass = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  gray: 'bg-gray-500',
}[color] || 'bg-green-500';

const textColorClass = {
  red: 'text-red-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  yellow: 'text-yellow-500',
  indigo: 'text-indigo-500',
  purple: 'text-purple-500',
  gray: 'text-gray-500',
}[color] || 'text-green-500';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">

        <span className={`text-sm ${textColorClass}`}>{value}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${bgColorClass} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );    
};

export default LinearProgressBar;
