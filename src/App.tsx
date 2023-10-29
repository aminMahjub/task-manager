import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./layouts/AppLayout";

import TodoList from "./pages/TodoList";
import Todo from "./pages/Todo";

const App = () => {
  const query = new QueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<TodoList />} />
        <Route path="todos/:id" element={<Todo />} />
      </Route>
    )
  );

  return (
    <QueryClientProvider client={query}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
