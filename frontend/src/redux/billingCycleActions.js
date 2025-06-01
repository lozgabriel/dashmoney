import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getList = createAsyncThunk('billingCycle/getList',
  async (params = {}, { rejectWithValue }) => {
    const { page = 1, limit = 10 } = params;
    try {
      const response = await axios.get(`${API_URL}/billingCycles`, {
        params: { page, limit }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createBillingCycle = createAsyncThunk('billingCycle/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/billingCycles`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateBillingCycle = createAsyncThunk('billingCycle/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/billingCycles/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);