import { RootState } from '@/store/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notificationState } from './notificationInterface';
import { notificationsList } from './notificationAction';

const initialState: notificationState = {
    notifications: [],
    notificationsBySocket: [],
    totalElements: 0,
    loading: false,
    error: null
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        ADD_NEW_NOTIFICATION(state, action: any) {
            return {
                ...state,
                notificationsBySocket: [...state.notificationsBySocket, action.payload]
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(notificationsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(notificationsList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.notifications = action.payload;
                state.totalElements = action.payload?.totalElements;
            })
            .addCase(notificationsList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { ADD_NEW_NOTIFICATION } = notificationSlice.actions;
export const selectNotificationsBySocket = (state: RootState) => state.notification.notificationsBySocket;
export const selectNotifications = (state: RootState) => state.notification.notifications;

export default notificationSlice.reducer;
