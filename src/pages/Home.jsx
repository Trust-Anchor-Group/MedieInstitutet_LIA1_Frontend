import React from 'react';
import { Banner } from '../components/Banner';

const Home = () => {
  return (
    <>
      <Banner imageSource="/public/assets/images/hero.jpg">
        <div className="banner__promo-card">
          <h1>
            Forget about programmers — creating contracts has never been easier!
          </h1>
        </div>
      </Banner>
    </>
  );
};

export default Home;
