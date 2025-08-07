import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Donation {
  id: string;
  amount: number;
  donorId: string;
  donorName: string;
  donationType: 'orphan' | 'orphanage' | 'campaign' | 'disaster';
  targetId: string;
  targetName: string;
  paymentMethod: string;
  transactionId: string;
  message?: string;
  isAnonymous: boolean;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

interface DonationsState {
  donations: Donation[];
  userDonations: Donation[];
  loading: boolean;
  error: string | null;
}

const initialState: DonationsState = {
  donations: [],
  userDonations: [],
  loading: false,
  error: null,
};

export const fetchDonationsByTarget = createAsyncThunk(
  'donations/fetchByTarget',
  async (
    { type, id }: { type: 'orphan' | 'orphanage' | 'campaign' | 'disaster'; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/donations/${type}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch donations');
    }
  }
);

export const fetchUserDonations = createAsyncThunk(
  'donations/fetchUserDonations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/donations/user');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user donations');
    }
  }
);

export const makeDonation = createAsyncThunk(
  'donations/make',
  async (donationData: Partial<Donation>, { rejectWithValue }) => {
    try {
      const response = await api.post('/donations', donationData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to process donation');
    }
  }
);

const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    clearDonationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonationsByTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonationsByTarget.fulfilled, (state, action: PayloadAction<Donation[]>) => {
        state.donations = action.payload;
        state.loading = false;
      })
      .addCase(fetchDonationsByTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDonations.fulfilled, (state, action: PayloadAction<Donation[]>) => {
        state.userDonations = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(makeDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeDonation.fulfilled, (state, action: PayloadAction<Donation>) => {
        state.userDonations.push(action.payload);
        state.loading = false;
      })
      .addCase(makeDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDonationError } = donationsSlice.actions;

export default donationsSlice.reducer;