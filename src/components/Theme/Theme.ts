import { createTheme, Theme } from "@mui/material/styles";

const newTheme = (theme: Theme) =>
  createTheme({
    ...theme,
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: "var(--green-pine) !important",
            },
            "&.Mui-selected:hover, &.Mui-selected:focus": {
              backgroundColor: "var(--turquoise) !important",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--green-pine) !important",
            },
            "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--turquoise) !important",
            },
          },
        },
      },
    },
  });

export { newTheme };
