import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IImage } from "../../interfaces";
import { imagesService } from "../../services";
import { progressActions } from "./progressSlice";

interface IState {
  avatar: File | string | null;
  gallery: IImage[];
  picture: IImage;
  error: {
    message?: string;
  };
  imageError: string | null;
}

const initialState: IState = {
  avatar: null,
  gallery: [],
  picture: null,
  error: null,
  imageError: null,
};

const getGallery = createAsyncThunk<IImage[], { userId: number }>(
  "imagesSlice/getGallery",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await imagesService.getGallery(userId);
      return data.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const getPictureFromGalleryById = createAsyncThunk<
  IImage,
  { userId: number; galleryId: number }
>(
  "imagesSlice/getPictureFromGalleryById",
  async ({ userId, galleryId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await imagesService.getGalleryById(userId, galleryId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const deletePictureFromGalleryById = createAsyncThunk<
  void,
  { userId: number; galleryId: number }
>(
  "imagesSlice/deletePictureFromGalleryById",
  async ({ userId, galleryId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await imagesService.deletePictureFromGalleryById(userId, galleryId);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const addPicturesToGallery = createAsyncThunk<
  IImage,
  { userId: number; data: FormData }
>(
  "imagesSlice/addPicturesToGallery",
  async ({ userId, data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const response = await imagesService.postPictureInGallery(userId, data);
      return response.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const addAvatar = createAsyncThunk<
  string | File,
  { userId: number; data: FormData }
>(
  "imagesSlice/addAvatar",
  async ({ userId, data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const response = await imagesService.postAvatar(userId, data);
      return response.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const deleteAvatar = createAsyncThunk<void, { userId: number }>(
  "imagesSlice/deleteAvatar",
  async ({ userId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await imagesService.deleteAvatar(userId);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const imagesSlice = createSlice({
  name: "imagesSlice",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setImageError: (state, action) => {
      state.imageError = action.payload;
    },
    clearImageError: (state) => {
      state.imageError = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getGallery.fulfilled, (state, action) => {
        state.gallery = action.payload;
      })
      .addCase(getPictureFromGalleryById.fulfilled, (state, action) => {
        state.picture = action.payload;
      })
      .addCase(addPicturesToGallery.fulfilled, (state, action) => {
        state.gallery.push(action.payload);
      })
      .addCase(deletePictureFromGalleryById.fulfilled, (state, action) => {
        state.gallery = state.gallery.filter(
          (image) => image.id !== action.meta.arg.galleryId,
        );
        state.picture = null;
      })
      .addCase(addAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload;
      })
      .addCase(deleteAvatar.fulfilled, (state) => {
        state.avatar = null;
      })
      .addMatcher(isRejected(), (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.error = null;
      }),
});

const { reducer: imagesReducer, actions } = imagesSlice;

const imagesActions = {
  ...actions,
  getGallery,
  getPictureFromGalleryById,
  addPicturesToGallery,
  deletePictureFromGalleryById,
  addAvatar,
  deleteAvatar,
};
export { imagesActions, imagesReducer };
