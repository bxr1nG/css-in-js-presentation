import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { Search, Anime } from "./pages";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/anime/:id",
    element: <Anime />,
  },
]);

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorTransparent: {
          backgroundColor: "white",
        },
      },
    },
  },
  shadows: Array(25).fill("none"),
  palette: {
    primary: {
      main: "#457cce",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: "#f3f3f3",
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
