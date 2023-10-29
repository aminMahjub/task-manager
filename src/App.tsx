import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import TodoList from "./pages/TodoList";
import Todo from "./pages/Todo";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<TodoList />} />
        <Route path="todos/:id" element={<Todo />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
