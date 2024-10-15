import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Global, Theme, ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Search, Anime } from "./pages";
import "./styles/normalize.scss";

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

const theme: Theme = {
  colors: {
    primary: "#457cce",
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Global
          styles={(theme) => ({
            button: {
              backgroundColor: theme.colors.primary,
              border: "none",
              borderRadius: 4,
              color: "#fff",
              cursor: "pointer",
            },
            body: {
              backgroundColor: "#f3f3f3",
            },
            "*, *::before, *::after": {
              boxSizing: "border-box" as never, // https://github.com/emotion-js/emotion/issues/3249
            },
            header: {
              marginBottom: "20px",
              display: "flex",
              gap: "15px",
            },
          })}
        />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
