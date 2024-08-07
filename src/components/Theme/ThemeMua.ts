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
            "&.MuiButton-text": {
              color: "var(--green-pine) !important",
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "var(--basic-black) !important",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            cursor: "pointer",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            input: {
              cursor: "pointer",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "1rem !important",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--green-pine) !important",
            },
            "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--turquoise) !important",
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            "&.MuiMultiSectionDigitalClockSection-root": {
              "&::-webkit-scrollbar": {
                width: "5px",
              },
            },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            marginBottom: "10px",
            cursor: "pointer",
          },
          listbox: {
            li: {
              "&:hover, &:focus, &:active, &:target, &:visited": {
                backgroundColor: "var(--green-jungle-crayola)!important",
              },
            },
          },
          input: {
            minWidth: "auto !important",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            color: "var(--basic-white)",
            backgroundColor: "var(--green-pine)!important",
          },
        },
      },
      MuiStack: {
        styleOverrides: {
          root: {
            width: "300px",
            "@media (max-width: 1050px)": {
              width: "240px",
            },
          },
        },
      },
    },
  });

export { newTheme };
