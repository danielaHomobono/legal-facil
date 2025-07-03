import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div 
        className="w-24 h-24 rounded-full animate-spin"
        style={{
          border: '6px solid #7cb9e8',
          borderTopColor: 'transparent',
          boxShadow: '0 0 15px rgba(124, 185, 232, 0.5)'
        }}
      />
    </div>
  );
};

export default LoadingSpinner;