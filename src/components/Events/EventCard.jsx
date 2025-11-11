import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight } from 'react-icons/fi';

const EventCard = ({ event, actions }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

return (
    <motion.div
      // ... existing props ...
    >
      <div className="relative">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {event.eventType}
          </span>
        </div>
        
        {/* Action Buttons inside EventCard */}
        {actions && (
          <div className="absolute top-4 left-4 flex space-x-2">
            {actions}
          </div>
        )}
      </div>
       

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FiCalendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {formatDate(event.eventDate)} at {formatTime(event.eventDate)}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FiMapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FiUsers className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {event.participants?.length || 0} participants
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={event.creator.photoURL || `https://ui-avatars.com/api/?name=${event.creator.displayName}&background=0ea5e9&color=fff`}
              alt={event.creator.displayName}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {event.creator.displayName}
            </span>
          </div>
          
          <Link
            to={`/events/${event._id}`}
            className="flex items-center text-primary-600 dark:text-primary-400 rounded-lg p-2 hover:bg-gray-500 dark:hover:text-primary-300 font-medium text-sm transition-colors"
          >
            View Details
            <FiArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;