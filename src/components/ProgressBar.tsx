import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="h-6 w-40 bg-base rounded-md mr-4">
      <div
        className={`h-6 bg-secondary-two rounded-md text-right`}
        style={{ width: `${percentage}%` }}
      >
        <span className="p-1 text-white font-bold">{`${percentage}%`}</span>
      </div>
    </div>
  );
};
