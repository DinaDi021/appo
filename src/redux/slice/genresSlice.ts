import { createSlice } from "@reduxjs/toolkit";
// import { AxiosError } from "axios";

// interface IState {
//   genres: IGenre[];
//   selectedGenreId: number | null;
// }

const initialState: any = {
  genres: [],
  selectedGenreId: null,
};

// const getGenre = createAsyncThunk<IGenre[], void>(
//   "genreSlice/getGenre",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await genreService.getAll();
//       return data.genres;
//     } catch (e) {
//       const err = e as AxiosError;
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

const genreSlice = createSlice({
  name: "genreSlice",
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.selectedGenreId = action.payload.id;
    },
    clearGenre: (state) => {
      state.selectedGenreId = null;
    },
  },
  // extraReducers: (builder) =>
  //   builder.addCase(getGenre.fulfilled, (state, action) => {
  //     state.genres = action.payload;
  //   }),
});

const {
  reducer: genreReducer,
  actions: { setGenre, clearGenre },
} = genreSlice;

const genreActions = {
  // getGenre,
  setGenre,
  clearGenre,
};

export { genreReducer, genreActions };
