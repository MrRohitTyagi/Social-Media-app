import { Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
