import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { eventsService } from '../../services/events';
import EventCard from '../../components/Events/EventCard';
import EventForm from '../../components/Events/EventForm';
import Spinner from '../../components/Layout/Spinner';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiX, FiCalendar } from 'react-icons/fi';

const ManageEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserEvents();
    }
  }, [user]);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching events for user:', user.uid);
      const userEvents = await eventsService.getUserEvents(user.uid);
      console.log('✅ Events fetched:', userEvents);
      setEvents(userEvents.events || userEvents || []);
    } catch (error) {
      console.error('❌ Error fetching user events:', error);
      toast.error('Failed to fetch your events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (eventData) => {
    setUpdating(true);
    try {
      await eventsService.updateEvent(editingEvent._id, eventData);
      toast.success('Event updated successfully!');
      setEditingEvent(null);
      fetchUserEvents(); // Refresh the list
    } catch (error) {
      toast.error(error.message || 'Failed to update event');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      // Note: You'll need to add a delete endpoint in your backend
      // await eventsService.deleteEvent(eventId);
      toast.info('Delete functionality will be implemented soon');
      // For now, just show a message
      // fetchUserEvents(); // Refresh the list
    } catch (error) {
      toast.error('Failed to delete event');
      console.log('Error deleting event:', error);
    }
  };

  const cancelEdit = () => {
    setEditingEvent(null);
  };

  // Debug: Log the current state
  console.log('📊 ManageEvents State:', {
    user: user?.uid,
    loading,
    eventsCount: events.length,
    events: events
  });

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You need to be logged in to manage events.
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
            Manage Your Events
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            View, edit, and manage all events you've created
          </p>
          <div className="mt-4 text-sm text-gray-500">
            User ID: {user.uid} | Events: {events.length}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="xl" />
          </div>
        ) : editingEvent ? (
          /* Edit Event Form */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Edit Event
                </h2>
                <button
                  onClick={cancelEdit}
                  className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FiX className="w-5 h-5 mr-1" />
                  Cancel
                </button>
              </div>
              
              <EventForm
                event={editingEvent}
                onSubmit={handleUpdateEvent}
                loading={updating}
              />
            </div>
          </div>
        ) : events.length > 0 ? (
          /* Events List */
          <>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {events.map(event => (
      <EventCard 
        key={event._id} 
        event={event}
        actions={
          <div className="flex space-x-2">
            <button
              onClick={() => setEditingEvent(event)}
              className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              title="Edit Event"
            >
              <FiEdit className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleDeleteEvent(event._id)}
              className="bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              title="Delete Event"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        }
      />
    ))}
  </div>
  
  {/* Stats section remains the same */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {events.length}
        </div>
        <div className="text-gray-600 dark:text-gray-400">Total Events</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
          {events.reduce((total, event) => total + (event.participants?.length || 0), 0)}
        </div>
        <div className="text-gray-600 dark:text-gray-400">Total Participants</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {events.filter(event => new Date(event.eventDate) > new Date()).length}
        </div>
        <div className="text-gray-600 dark:text-gray-400">Upcoming Events</div>
      </div>
    </div>
  </div>
          </>
        ) : (
          /* No Events State */
          <div className="text-center py-12">
            <FiCalendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No events created yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start organizing your first community event and make a difference!
            </p>
            <a
              href="/create-event"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Create Your First Event
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;