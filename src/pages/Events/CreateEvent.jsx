import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { eventsService } from '../../services/events';
import EventForm from '../../components/Events/EventForm';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (eventData) => {
    if (!user) {
      toast.error('Please login to create an event');
      return;
    }

    setLoading(true);
    try {
      await eventsService.createEvent(eventData);
      toast.success('Event created successfully!');
      navigate('/events');
    } catch (error) {
      toast.error(error.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You need to be logged in to create an event.
          </p>
          <Link
            to="/login"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/events"
            className="inline-flex p-2 rounded-lg hover:bg-gray-500 items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl  md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Create New Event
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Organize a community event and make a difference in your neighborhood
            </p>
          </div>
        </div>

        {/* Event Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <EventForm 
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Event Creation Tips
          </h3>
          <ul className="text-blue-800 dark:text-blue-200 space-y-2 text-sm">
            <li>• Choose a clear, descriptive title for your event</li>
            <li>• Provide detailed information about what participants will be doing</li>
            <li>• Select an appropriate event type to help people find your event</li>
            <li>• Use a high-quality image that represents your event well</li>
            <li>• Be specific about the location and meeting point</li>
            <li>• Set the event date at least a few days in the future to allow people to plan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;