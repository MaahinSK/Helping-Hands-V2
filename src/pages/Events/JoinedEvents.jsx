import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { eventsService } from '../../services/events';
import EventCard from '../../components/Events/EventCard';
import Spinner from '../../components/Layout/Spinner';
import { toast } from 'react-toastify';
import { FiCalendar, FiUsers, FiClock } from 'react-icons/fi';

const JoinedEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'

  useEffect(() => {
    if (user) {
      fetchJoinedEvents();
    }
  }, [user]);

  const fetchJoinedEvents = async () => {
    try {
      setLoading(true);
      const joinedEvents = await eventsService.getJoinedEvents(user.uid);
      setEvents(joinedEvents);
    } catch (error) {
      toast.error('Failed to fetch joined events');
      console.error('Error fetching joined events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = (events) => {
    const now = new Date();
    switch (filter) {
      case 'upcoming':
        return events.filter(event => new Date(event.eventDate) > now);
      case 'past':
        return events.filter(event => new Date(event.eventDate) <= now);
      default:
        return events;
    }
  };

  const filteredEvents = filterEvents(events);

  const getStats = () => {
    const now = new Date();
    const upcoming = events.filter(event => new Date(event.eventDate) > now).length;
    const past = events.filter(event => new Date(event.eventDate) <= now).length;
    
    return { upcoming, past, total: events.length };
  };

  const stats = getStats();

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You need to be logged in to view joined events.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Joined Events
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track all the community events you're participating in
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Joined</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiClock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.upcoming}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Upcoming</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.past}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Completed</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          <div className="flex space-x-4">
            {[
              { key: 'all', label: 'All Events', count: stats.total },
              { key: 'upcoming', label: 'Upcoming', count: stats.upcoming },
              { key: 'past', label: 'Completed', count: stats.past }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  filter === tab.key
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  filter === tab.key
                    ? 'bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="xl" />
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiCalendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {filter === 'all' ? 'No events joined yet' : `No ${filter} events`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {filter === 'all' 
                ? "Start exploring community events and join ones that interest you!"
                : filter === 'upcoming'
                ? "You don't have any upcoming events. Explore events to join!"
                : "You haven't completed any events yet."
              }
            </p>
            {filter !== 'past' && (
              <a
                href="/events"
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Explore Events
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedEvents;