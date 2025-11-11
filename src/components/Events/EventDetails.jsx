import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { eventsService } from '../../services/events';
import Spinner from '../Layout/Spinner';
import { FiCalendar, FiMapPin, FiUsers, FiUser, FiClock, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const EventDetails = ({ event, onEventUpdate }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(
    event.participants?.some(participant => participant.uid === user?.uid)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error('Please login to join this event');
      return;
    }

    setLoading(true);
    try {
      await eventsService.joinEvent(event._id, user);
      setIsJoined(true);
      toast.success('Successfully joined the event!');
      
      // Update event data
      if (onEventUpdate) {
        const updatedEvent = await eventsService.getEvent(event._id);
        onEventUpdate(updatedEvent);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to join event');
    } finally {
      setLoading(false);
    }
  };

  const isEventCreator = user && event.creator.uid === user.uid;
  const isPastEvent = new Date(event.eventDate) < new Date();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/events"
        className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
      >
        <FiArrowLeft className="w-4 h-4 mr-2" />
        Back to Events
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Event Image */}
        <div className="relative h-80">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {event.eventType}
            </span>
          </div>
        </div>

        <div className="p-8">
          {/* Event Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {event.title}
          </h1>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FiCalendar className="w-5 h-5 mr-3 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Date & Time</p>
                <p>{formatDate(event.eventDate)}</p>
                <p className="text-sm">{formatTime(event.eventDate)}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FiMapPin className="w-5 h-5 mr-3 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Location</p>
                <p>{event.location}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FiUsers className="w-5 h-5 mr-3 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Participants</p>
                <p>{event.participants?.length || 0} people joined</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FiUser className="w-5 h-5 mr-3 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Organizer</p>
                <p>{event.creator.displayName}</p>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About this Event
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Participants List */}
          {event.participants && event.participants.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Participants ({event.participants.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {event.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-full px-4 py-2"
                  >
                    <img
                      src={participant.photoURL || `https://ui-avatars.com/api/?name=${participant.displayName}&background=0ea5e9&color=fff`}
                      alt={participant.displayName}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {participant.displayName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t dark:border-gray-700 pt-6">
            {!isPastEvent ? (
              <div className="flex flex-col sm:flex-row gap-4">
                {!isEventCreator && (
                  <button
                    onClick={handleJoinEvent}
                    disabled={loading || isJoined || !user}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <Spinner size="sm" />
                    ) : isJoined ? (
                      'Already Joined'
                    ) : !user ? (
                      'Login to Join'
                    ) : (
                      'Join Event'
                    )}
                  </button>
                )}
                
                {isEventCreator && (
                  <div className="flex-1 text-center py-3 px-6 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg font-medium">
                    You are the organizer of this event
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-3 px-6 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg font-medium">
                This event has already passed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;