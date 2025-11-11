import { api } from './api.js';

export const eventsService = {
  getEvents(filters = {}) {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    return api.get(`/events?${params}`);
  },

  getEvent(id) {
    return api.get(`/events/${id}`);
  },

  createEvent(eventData) {
    return api.post('/events', eventData);
  },


  updateEvent(id, eventData) {
    return api.put(`/events/${id}`, eventData);
  },


  joinEvent(id, user) {
    return api.post(`/events/${id}/join`, { user });
  },

 


  getUserEvents(uid) {
    return api.get(`/events/user/${uid}`);
  },

  getJoinedEvents(uid) {
    return api.get(`/users/${uid}/joined-events`);
  }
};