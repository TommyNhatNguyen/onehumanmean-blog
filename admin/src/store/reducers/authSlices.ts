import { RootState } from "./../index";
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import adminAuthServices from "../../services/adminAuthServices";
import tokenMethod from "../../utils/tokenMethod";
import { message } from "antd";

type userProfileType = {
  username: string | null;
  loading: boolean;
  error: SerializedError | null;
};

const initialState: userProfileType = {
  username: "",
  loading: false,
  error: null,
};

export const authSlices = createSlice({
  name: "authSlices",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      if (!!tokenMethod.get()) {
        tokenMethod.delete();
        message.success("Logout successful");
        state.username = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload;
      })
      .addCase(loginAdmin.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload;
      })
      .addCase(getProfile.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(changePassword.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(changePassword.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

const { actions, reducer: authReducers } = authSlices;

export const { logoutAdmin } = actions;
export default authReducers;

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (payload: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const {
      email,
      password,
      options: { onSuccess, onFail },
    } = payload;
    try {
      const _payload = {
        username: email,
        password: password,
      };
      const res = await adminAuthServices.login(_payload);
      if (res?.data?.data) {
        const { user, accessToken, refreshToken } = res?.data?.data;
        tokenMethod.set({ accessToken, refreshToken });
        onSuccess();
        return user;
      }
    } catch (error) {
      onFail(error);
      rejectWithValue(error);
    }
  },
);

export const getProfile = createAsyncThunk(
  "admin/profile",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await adminAuthServices.getProfile();
      if (data?.data) {
        return data?.data?.data?.username;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const changePassword = createAsyncThunk(
  "admin/change-password",
  async (payload: any, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    const {
      oldPassword,
      newPassword,
      callback: { onSuccess, onFail },
    } = payload || {};
    try {
      const username = state?.authReducers?.username;
      await adminAuthServices.changePassword({
        username,
        oldPassword,
        newPassword,
      });
      onSuccess();
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
      onFail(error);
    }
  },
);
