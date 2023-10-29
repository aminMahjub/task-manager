import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import TodoList from "./pages/TodoList";
import Todo from "./pages/Todo";

const App = () => {
  const query = new QueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<TodoList />} />
        <Route path="/:id" element={<Todo />} />
      </>
    )
  );

  return (
    <QueryClientProvider client={query}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
