import { createSlice } from "@reduxjs/toolkit";

interface IState {
  filterDate: string[] | null;
  filterService: number[] | null;
  filterCategories: string[] | null;
  filterMaster: number | null;
}

const initialState: IState = {
  filterDate: null,
  filterService: undefined,
  filterCategories: null,
  filterMaster: undefined,
};

const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    setDateFilter: (state, action) => {
      state.filterDate = action.payload;
    },
    clearDateFilter: (state) => {
      state.filterDate = null;
    },
    setServiceFilter: (state, action) => {
      state.filterService = action.payload;
    },
    clearServiceFilter: (state) => {
      state.filterService = null;
    },
    setCategoryFilter: (state, action) => {
      state.filterCategories = action.payload;
    },
    clearCategoryFilter: (state) => {
      state.filterCategories = null;
    },
    setMasterFilter: (state, action) => {
      state.filterMaster = action.payload;
    },
    clearMasterFilter: (state) => {
      state.filterMaster = null;
    },
  },
});

const { reducer: filtersReducer, actions } = filtersSlice;

const filtersActions = {
  ...actions,
};
export { filtersActions, filtersReducer };
