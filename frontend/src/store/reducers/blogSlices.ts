import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { blogServices } from "../../services/blogServices";

export interface blogType {
  blogs: any[];
  loading: boolean;
  error: SerializedError | null;
  blogSingle: any;
}

const initialState: blogType = {
  blogs: [],
  loading: false,
  error: null,
  blogSingle: "",
};

export const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(getAllBlogs.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.blogSingle = action.payload;
        state.loading = false;
      })
      .addCase(getBlogById.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateBlogById.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(updateBlogById.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(updateBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createBlog.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(createBlog.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteBlogById.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteBlogById.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(deleteBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

const { actions, reducer: blogReducers } = blogSlice;

export const {} = actions;
export default blogReducers;

export const getAllBlogs = createAsyncThunk(
  "blog/getblogs",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await blogServices.getBlogs();
      if (res?.data) {
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const getBlogById = createAsyncThunk(
  "blog/getblogsbyid",
  async (payload: { blogId: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { blogId } = payload;
      const res = await blogServices.getBlogsById(blogId);
      if (res?.data) {
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const createBlog = createAsyncThunk(
  "blog/createblog",
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
      const res = await blogServices.createBlog(_payload);
      if (res?.data) {
        console.log(res?.data?.data);
        dispatch(getAllBlogs());
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const updateBlogById = createAsyncThunk(
  "blog/updateblogsbyid",
  async (payload: any, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { blogId, ...data } = payload;
      const res = await blogServices.updateBlogById(blogId, data);
      if (res?.data) {
        dispatch(getAllBlogs());
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);

export const deleteBlogById = createAsyncThunk(
  "blog/deleteblogsbyid",
  async (payload: { blogId: string }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const { blogId } = payload;
      const res = await blogServices.deleteBlogById(blogId);
      if (res?.data) {
        dispatch(getAllBlogs());
        return res?.data?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);
