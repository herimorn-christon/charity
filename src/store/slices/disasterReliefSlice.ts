import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface DisasterRelief {
  id: string;
  title: string;
  description: string;
  location: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  status: 'active' | 'completed' | 'cancelled';
  urgencyLevel: 'high' | 'medium' | 'low';
  affectedCount: number;
  createdAt: string;
  updatedAt: string;
}

interface DisasterReliefState {
  disasters: DisasterRelief[];
  currentDisaster: DisasterRelief | null;
  loading: boolean;
  error: string | null;
}

const initialState: DisasterReliefState = {
  disasters: [],
  currentDisaster: null,
  loading: false,
  error: null,
};

export const fetchDisasters = createAsyncThunk(
  'disasterRelief/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/disasters');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch disasters');
    }
  }
);

export const fetchDisasterById = createAsyncThunk(
  'disasterRelief/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/disasters/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch disaster');
    }
  }
);

export const createDisaster = createAsyncThunk(
  'disasterRelief/create',
  async (disasterData: Partial<DisasterRelief>, { rejectWithValue }) => {
    try {
      const response = await api.post('/disasters', disasterData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create disaster relief');
    }
  }
);

const disasterReliefSlice = createSlice({
  name: 'disasterRelief',
  initialState,
  reducers: {
    clearDisasterError: (state) => {
      state.error = null;
    },
    clearCurrentDisaster: (state) => {
      state.currentDisaster = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDisasters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisasters.fulfilled, (state, action: PayloadAction<DisasterRelief[]>) => {
        state.disasters = action.payload;
        state.loading = false;
      })
      .addCase(fetchDisasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDisasterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisasterById.fulfilled, (state, action: PayloadAction<DisasterRelief>) => {
        state.currentDisaster = action.payload;
        state.loading = false;
      })
      .addCase(fetchDisasterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDisaster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDisaster.fulfilled, (state, action: PayloadAction<DisasterRelief>) => {
        state.disasters.push(action.payload);
        state.loading = false;
      })
      .addCase(createDisaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDisasterError, clearCurrentDisaster } = disasterReliefSlice.actions;

export default disasterReliefSlice.reducer;