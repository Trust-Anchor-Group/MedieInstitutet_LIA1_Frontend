import React from 'react';
import { Banner } from '../components/Banner';
import promoImage from '/public/assets/images/hero.jpg';

const HomePage = () => {
  return (
    <>
      <Banner imageSource={promoImage}>
        <div className="banner__promo-card">
          <h1>
            Forget about programmers — creating contracts has never been easier!
          </h1>
        </div>
      </Banner>
    </>
  );
};

export default HomePage;
