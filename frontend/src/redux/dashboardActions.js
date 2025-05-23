import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getSummary = createAsyncThunk('dashboard/getSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/billingCycles/summary`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);