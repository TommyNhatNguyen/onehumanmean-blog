import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { projectServices } from "../../services/projectServices";

export interface projectType {
  projects: any[];
  loading: boolean;
  error: SerializedError | null;
  projectSingle: any;
}

const initialState: projectType = {
  projects: [],
  loading: false,
  error: null,
  projectSingle: "",
};

export const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(getAllProjects.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.projectSingle = action.payload;
        state.loading = false;
      })
      .addCase(getProjectById.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateProjectById.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(updateProjectById.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(updateProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createProject.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(createProject.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteProjectById.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteProjectById.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(deleteProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

const { actions, reducer: projectReducers } = projectSlice;

export const {} = actions;
export default projectReducers;

export const getAllProjects = createAsyncThunk(
  "project/getprojects",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await projectServices.getProjects();
      if (res?.data) {
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const getProjectById = createAsyncThunk(
  "project/getprojectsbyid",
  async (payload: { projectId: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { projectId } = payload;
      const res = await projectServices.getProjectsById(projectId);
      if (res?.data) {
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const createProject = createAsyncThunk(
  "project/createproject",
  async (payload: any, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const _payload = {
        title: payload.title,
        content: payload.content,
        position: payload.position,
        thumbnail_url: payload.thumbnailUrl,
        author: payload.author,
        category: payload.category,
      };
      const res = await projectServices.createProject(_payload);
      if (res?.data) {
        console.log(res?.data?.data);
        dispatch(getAllProjects());
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const updateProjectById = createAsyncThunk(
  "project/updateblogsbyid",
  async (payload: any, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { projectId, ...data } = payload;
      const res = await projectServices.updateProjectById(projectId, data);
      if (res?.data) {
        dispatch(getAllProjects());
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const deleteProjectById = createAsyncThunk(
  "project/deleteblogsbyid",
  async (payload: { projectId: string }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { projectId } = payload;
      const res = await projectServices.deleteProjectById(projectId);
      if (res?.data) {
        dispatch(getAllProjects());
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);
