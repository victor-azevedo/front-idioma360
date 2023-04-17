import { Box, useTheme } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

export default function LoadingDots() {
  const theme = useTheme();

  return (
    <Box margin="auto">
      <ThreeDots
        color={theme.palette.primary.darkest}
        height="80"
        width="80"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Box>
  );
}
