import { createSlice } from "@reduxjs/toolkit";

// import { AxiosError } from "axios";
import { IUser } from "../../interfaces";
// import { usersService } from "../../services";
// import { progressActions } from "./progressSlice";

interface IState {
  userById: IUser | null;
  userForUpdate: IUser | null;
}

const initialState: IState = {
  userById: null,
  userForUpdate: null,
};

// const getUsersById = createAsyncThunk<IUser, { id: number }>(
//   "usersSlice/getUsersById",
//   async ({ id }, { rejectWithValue, dispatch }) => {
//     try {
//       dispatch(progressActions.setIsLoading(true));
//       const { data } = await usersService.getProfile(id);
//       return data;
//     } catch (e) {
//       const err = e as AxiosError;
//       return rejectWithValue(err.response.data);
//     } finally {
//       dispatch(progressActions.setIsLoading(false));
//     }
//   },
// );

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  // extraReducers: (builder) =>
  //   builder.addCase(getUsersById.fulfilled, (state, action) => {
  //     state.userById = action.payload;
  //   }),
});

const { reducer: usersReducer, actions } = usersSlice;

const usersActions = {
  ...actions,
};
export { usersActions, usersReducer };
