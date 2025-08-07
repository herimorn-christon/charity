import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Orphan {
  id: string;
  name: string;
  age: number;
  gender: string;
  story: string;
  imageUrl?: string;
  healthStatus: string;
  educationStatus: string;
  isSponsored: boolean;
  sponsorId?: string;
  orphanageId: string;
  needsUrgentHelp: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Orphanage {
  id: string;
  name: string;
  location: string;
  phoneNumber: string;
  email: string;
  description: string;
  license?: string;
  imageUrl?: string;
  managerId: string;
  orphanCount: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  orphans?: Orphan[];
}

interface OrphanagesState {
  orphanages: Orphanage[];
  currentOrphanage: Orphanage | null;
  orphans: Orphan[];
  currentOrphan: Orphan | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrphanagesState = {
  orphanages: [],
  currentOrphanage: null,
  orphans: [],
  currentOrphan: null,
  loading: false,
  error: null,
};

export const fetchOrphanages = createAsyncThunk(
  'orphanages/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/orphanages');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orphanages');
    }
  }
);

export const fetchOrphanageById = createAsyncThunk(
  'orphanages/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/orphanages/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orphanage');
    }
  }
);

export const fetchOrphans = createAsyncThunk(
  'orphanages/fetchOrphans',
  async (orphanageId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/orphanages/${orphanageId}/orphans`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orphans');
    }
  }
);

export const registerOrphanage = createAsyncThunk(
  'orphanages/register',
  async (orphanageData: Partial<Orphanage>, { rejectWithValue }) => {
    try {
      const response = await api.post('/orphanages', orphanageData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to register orphanage');
    }
  }
);

export const addOrphan = createAsyncThunk(
  'orphanages/addOrphan',
  async (
    { orphanageId, orphanData }: { orphanageId: string; orphanData: Partial<Orphan> },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/orphanages/${orphanageId}/orphans`, orphanData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add orphan');
    }
  }
);

const orphanagesSlice = createSlice({
  name: 'orphanages',
  initialState,
  reducers: {
    clearOrphanageError: (state) => {
      state.error = null;
    },
    clearCurrentOrphanage: (state) => {
      state.currentOrphanage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrphanages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrphanages.fulfilled, (state, action: PayloadAction<Orphanage[]>) => {
        state.orphanages = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrphanages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrphanageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrphanageById.fulfilled, (state, action: PayloadAction<Orphanage>) => {
        state.currentOrphanage = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrphanageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrphans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrphans.fulfilled, (state, action: PayloadAction<Orphan[]>) => {
        state.orphans = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrphans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerOrphanage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerOrphanage.fulfilled, (state, action: PayloadAction<Orphanage>) => {
        state.orphanages.push(action.payload);
        state.loading = false;
      })
      .addCase(registerOrphanage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addOrphan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrphan.fulfilled, (state, action: PayloadAction<Orphan>) => {
        state.orphans.push(action.payload);
        state.loading = false;
      })
      .addCase(addOrphan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOrphanageError, clearCurrentOrphanage } = orphanagesSlice.actions;

export default orphanagesSlice.reducer;