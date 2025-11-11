import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiUsers, FiCalendar, FiHeart } from 'react-icons/fi';

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Make a Difference in Your{' '}
              <span className="text-yellow-300">Community</span>
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl">
              Join hands with neighbors, create meaningful events, and build stronger communities together. Every helping hand counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/events"
                className="border-2 text-primary-600 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Explore Events</span>
                <FiArrowRight />
              </Link>
              <Link
                to="/create-event"
                className="border-2 border-white text-white hover:bg-gray-600 hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Create Event</span>
                <FiCalendar />
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <FiUsers className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="text-3xl font-bold">580+</div>
              <div className="text-primary-200">Volunteers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <FiCalendar className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="text-3xl font-bold">120+</div>
              <div className="text-primary-200">Events</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <FiHeart className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
              <div className="text-3xl font-bold">50+</div>
              <div className="text-primary-200">Communities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-yellow-300 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">HH</span>
              </div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-primary-200">Support</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;