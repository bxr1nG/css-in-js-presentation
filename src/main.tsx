import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Search, Anime } from "./pages";
import "./styles/main.scss";

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
    </QueryClientProvider>
  </StrictMode>,
);
