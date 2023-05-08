import { alpha } from "@mui/material/styles";
import {
  error,
  figmaNeutral,
  figmaThemeColor,
  info,
  neutral,
  purple,
  success,
  warning,
} from "./colors";

export function createPalette() {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
    },
    background: {
      default: figmaThemeColor.background,
      paper: figmaNeutral.white,
    },
    divider: "#F2F4F7",
    error,
    info,
    mode: "light",
    neutral,
    primary: purple,
    success,
    text: {
      primary: figmaThemeColor.text,
      secondary: figmaNeutral.grey3,
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };
}
