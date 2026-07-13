import React from 'react';

const GoogleAdBanner = ({ size = 'horizontal' }) => {
  const classes = size === 'horizontal' ? 'py-8' : size === 'vertical' ? 'py-16' : 'py-12';
  
  return (
    <div className={`d_google_ad ${classes}`}>
      <h5>Google AdSense Banner</h5>
      <p className="mb-0">Insert your Google AdSense code here</p>
    </div>
  );
};

export default GoogleAdBanner;
