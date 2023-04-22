import { createTheme as createMuiTheme } from "@mui/material";
import { createComponents } from "./create-components";
import { createPalette } from "./create-palette";
import { createShadows } from "./create-shadows";
import { createTransitions } from "./create-transitions";
import { createTypography } from "./create-typography";

export function createTheme() {
  const palette = createPalette();
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();
  const transitions = createTransitions();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8,
    },
    typography,
    transitions,
  });
}
