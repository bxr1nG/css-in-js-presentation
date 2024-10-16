import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { Search, Anime } from "./pages";
import "@mui/material-pigment-css/styles.css";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>,
);
