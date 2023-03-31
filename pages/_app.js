import "@/styles/reset.css";
import "react-toastify/dist/ReactToastify.css";

import { createTheme } from "@/src/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </LocalizationProvider>
  );
}
