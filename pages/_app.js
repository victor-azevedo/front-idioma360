import "react-toastify/dist/ReactToastify.css";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";

import { AuthConsumer, AuthProvider } from "../src/contexts/auth-context";
import { createTheme } from "../src/theme";

const SplashScreen = () => null;

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          <AuthConsumer>
            {(auth) =>
              auth.isLoading ? (
                <SplashScreen />
              ) : (
                getLayout(<Component {...pageProps} />)
              )
            }
          </AuthConsumer>
        </ThemeProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}
