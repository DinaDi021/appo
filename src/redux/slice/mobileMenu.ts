import { createSlice } from "@reduxjs/toolkit";

interface IState {
  isMobileMenuOpen: boolean;
}

const initialState: IState = {
  isMobileMenuOpen: false,
};

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState,
  reducers: {
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
});

const { reducer: mobileMenuReducer, actions: mobileMenuActions } =
  mobileMenuSlice;

export { mobileMenuActions, mobileMenuReducer };
