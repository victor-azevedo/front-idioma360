import { alpha } from "@mui/material/styles";

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral = {
  50: "#F8F9FA",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D2D6DB",
  400: "#9DA4AE",
  500: "#6C737F",
  600: "#4D5761",
  700: "#2F3746",
  800: "#1C2536",
  900: "#111927",
};

export const indigo = withAlphas({
  lightest: "#F5F7FF",
  light: "#EBEEFE",
  main: "#6366F1",
  dark: "#4338CA",
  darkest: "#312E81",
  contrastText: "#FFFFFF",
});

export const purple = withAlphas({
  lightest: "#F5F7FF",
  light: "#EBEEFE",
  main: "#4D44B5",
  dark: "#4338CA",
  darkest: "#312E81",
  contrastText: "#FFFFFF",
});

export const success = withAlphas({
  lightest: "#F0FDF9",
  light: "#3FC79A",
  main: "#10B981",
  dark: "#0B815A",
  darkest: "#134E48",
  contrastText: "#FFFFFF",
});

export const info = withAlphas({
  lightest: "#ECFDFF",
  light: "#CFF9FE",
  main: "#FB7D5B",
  dark: "#0E7090",
  darkest: "#164C63",
  contrastText: "#FFFFFF",
});

export const warning = withAlphas({
  lightest: "#FFFAEB",
  light: "#FEF0C7",
  main: "#F79009",
  dark: "#B54708",
  darkest: "#7A2E0E",
  contrastText: "#FFFFFF",
});

export const error = withAlphas({
  lightest: "#FEF3F2",
  light: "#FEE4E2",
  main: "#F04438",
  dark: "#B42318",
  darkest: "#7A271A",
  contrastText: "#FFFFFF",
});

export const figmaThemeColor = {
  purple: { main: "#4D44B5" },
  orange: "#FB7D5B",
  yellow: "#FCC43E",
  text: "#303972",
  green: "#4CBC9A",
  red: "#FF4550",
  background: "#F3F4FF",
};

export const figmaNeutral = {
  white: "#FFFFFF",
  grey1: "#F5F5F5",
  grey2: "#C1BBEB",
  grey3: "#A098AE",
};

export const figmaGradient = {
  linear1:
    "linear-gradient(180deg, #FB7D5B -242.86%, rgba(251, 125, 91, 0) 100%)",
  linear2:
    "linear-gradient(180deg, #FCC43E -241.95%, rgba(252, 196, 62, 0) 100%)",
  linear3: "linear-gradient(178.76deg, #4D44B5 -47.98%, #303972 163.51%)",
};
