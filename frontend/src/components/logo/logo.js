import React from 'react';
import './logo.css';
import SmallImage from './USC_small.png';
import MediumImage from './USC_large.png';
import LargeImage from './USC_large.png';

const Logo = () => {
  return (
    <div className="image-container mx-auto">
      <img className="responsive-image" src={SmallImage} alt="Small Image" />
      <img className="responsive-image" src={MediumImage} alt="Medium Image" />
      <img className="responsive-image" src={LargeImage} alt="Large Image" />
    </div>
  );
};

export default Logo;
