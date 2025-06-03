import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const getList = createAsyncThunk('billingCycle/getList',
  async (params = {}, { rejectWithValue }) => {
    const { page = 1, limit = 10 } = params;
    try {
      const response = await api.get('/billingCycles', { params: { page, limit } });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createBillingCycle = createAsyncThunk('billingCycle/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/billingCycles', data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateBillingCycle = createAsyncThunk('billingCycle/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/billingCycles/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteBillingCycle = createAsyncThunk('billingCycle/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/billingCycles/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);