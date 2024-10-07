import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { notificationServices } from "../../services/notificationServices";

type notiType = {
  notifications: any;
  loading: boolean;
  error: SerializedError | string | undefined | null;
};

const initialState: notiType = {
  notifications: [],
  loading: false,
  error: "",
};

const notiSlices = createSlice({
  name: "notiSlices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.fulfilled, (state, actions) => {
        state.notifications = actions.payload;
        state.loading = false;
      })
      .addCase(getAllNotifications.rejected, (state, actions) => {
        state.error = actions.error;
        state.loading = false;
      })
      .addCase(getAllNotifications.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(updateNotification.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(updateNotification.rejected, (state, actions) => {
        state.error = actions.error;
        state.loading = false;
      })
      .addCase(updateNotification.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(deleteNotification.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteNotification.rejected, (state, actions) => {
        state.error = actions.error;
        state.loading = false;
      })
      .addCase(deleteNotification.pending, (state, _) => {
        state.loading = true;
      });
  },
});

export const { actions, reducer: notiReducers } = notiSlices;

export const {} = actions;
export default notiReducers;

export const getAllNotifications = createAsyncThunk(
  "admin/notifications",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await notificationServices.getAllNotifications();
      if (data) {
        return data?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const updateNotification = createAsyncThunk(
  "admin/notifications-update",
  async (payload: any, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    const {
      questionId,
      answer,
      callback: { onSuccess, onFail },
    } = payload;
    try {
      const _payload = { questionId: questionId, answer: answer };
      const data = await notificationServices.answer(_payload);
      if (data) {
        onSuccess();
        return data?.data?.data;
      }
    } catch (error) {
      console.log(error);
      onFail(error);
      rejectWithValue(error);
    } finally {
      dispatch(getAllNotifications());
    }
  },
);

export const deleteNotification = createAsyncThunk(
  "admin/notifications-delete",
  async (payload: any, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    const {
      questionId,
      callback: { onSuccess, onFail },
    } = payload;

    try {
      await notificationServices.deleteNotification(`/${questionId}`);
      onSuccess();
    } catch (error) {
      console.log(error);
      onFail(error);
      rejectWithValue(error);
    } finally {
      dispatch(getAllNotifications());
    }
  },
);

export const createNotification = createAsyncThunk(
  "notifications-create",
  async (payload: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const _payload = { email: payload.email, question: payload.question };
    try {
      await notificationServices.askQuestion(_payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);
