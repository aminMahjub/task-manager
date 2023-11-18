import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail";
import AddTask, { action as addTaskFormAction } from "./pages/AddTask";

const App = () => {
  const query = new QueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<TaskList />} />
        <Route path="/:id" element={<TaskDetail />} />
        <Route
          path="/add-task"
          element={<AddTask />}
          action={addTaskFormAction(query)}
        />
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
