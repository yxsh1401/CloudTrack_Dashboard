import React from 'react';
import clsx from 'clsx'; // Optional: use for conditional class merging

const LinearProgressBar = ({ value, target = 100, color = 'green' }) => {
  const gap = target - value;
  const gapColor = gap > 0 ? 'text-red-500' : 'text-green-500';
  const gapText = `${gap > 0 ? '-' : '+'}${Math.abs(gap)}% Gap`;

  const bgColorClass = {
    red: 'red-500',
    green: 'green-500',
    blue: 'blue-500',
    yellow: 'yellow-500',
    indigo: 'indigo-500',
    purple: 'purple-500',
    gray: 'gray-500',
  }[color] || 'bg-green-500';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">

        <span className={`text-sm text-${bgColorClass}`}>{value}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-${bgColorClass} rounded-full transition-all duration-500 z-10`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );    
};

export default LinearProgressBar;
