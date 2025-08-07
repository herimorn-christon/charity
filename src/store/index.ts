import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import orphanagesReducer from './slices/orphanagesSlice';
import campaignsReducer from './slices/campaignsSlice';
import donationsReducer from './slices/donationsSlice';
import eventsReducer from './slices/eventsSlice';
import disasterReliefReducer from './slices/disasterReliefSlice';
import usersReducer from './slices/usersSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orphanages: orphanagesReducer,
    campaigns: campaignsReducer,
    donations: donationsReducer,
    events: eventsReducer,
    disasterRelief: disasterReliefReducer,
    users: usersReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;