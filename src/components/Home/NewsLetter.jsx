import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiMail } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMail className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Stay Updated with Community Events
          </h2>
          
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss an opportunity to make a difference in your community.
          </p>

          <form onSubmit={handleSubmit} className="border-2 rounded-lg max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-primary-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;