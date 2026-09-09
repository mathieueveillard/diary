import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { Entry } from "./routes/Entry";
import { List } from "./routes/List";
import { NewEntry } from "./routes/NewEntry";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", Component: List },
  { path: "/entries/new", Component: NewEntry },
  { path: "/entries/:id", Component: Entry },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
