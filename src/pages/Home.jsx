import React from 'react';
import Banner from '../components/Home/Banner';
import Features from '../components/Home/Features';
import Gallery from '../components/Home/Gallery';
import Newsletter from '../components/Home/Newsletter';

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <Banner />
      <Features />
      <Gallery />
      <Newsletter />
    </div>
  );
};

export default Home;