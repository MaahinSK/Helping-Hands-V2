import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiMapPin, FiHeart, FiShare2, FiAward } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: 'Create Events',
      description: 'Easily organize and manage community events with our intuitive event creation tools.'
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Join Events',
      description: 'Discover and participate in local community events that match your interests.'
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: 'Local Focus',
      description: 'Connect with your local community and make an impact right in your neighborhood.'
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: 'Social Impact',
      description: 'Track your contributions and see the positive impact you are making in your community.'
    },
    {
      icon: <FiShare2 className="w-8 h-8" />,
      title: 'Share & Invite',
      description: 'Easily share events with friends and invite others to join your community efforts.'
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: 'Recognition',
      description: 'Get recognized for your contributions and build your community service profile.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Helping Hands?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform makes it easy to connect, organize, and participate in community service events that matter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;