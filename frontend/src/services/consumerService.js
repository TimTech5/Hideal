import apiClient from './api';

const ConsumerService = {
  getConsumers: async (page = 1, limit = 20, filters = {}) => {
    const response = await apiClient.get('/consumers', {
      params: {
        page,
        limit,
        ...filters
      }
    });
    return response.data;
  },

  getConsumerById: async (id) => {
    const response = await apiClient.get(`/consumers/${id}`);
    return response.data;
  },

  createConsumer: async (data) => {
    const response = await apiClient.post('/consumers', data);
    return response.data;
  },

  updateConsumer: async (id, data) => {
    const response = await apiClient.put(`/consumers/${id}`, data);
    return response.data;
  },

  deleteConsumer: async (id) => {
    const response = await apiClient.delete(`/consumers/${id}`);
    return response.data;
  },

  addPreference: async (consumerId, data) => {
    const response = await apiClient.post(`/consumers/${consumerId}/preferences`, data);
    return response.data;
  },

  getPreferences: async (consumerId) => {
    const response = await apiClient.get(`/consumers/${consumerId}/preferences`);
    return response.data;
  }
};

export default ConsumerService;
