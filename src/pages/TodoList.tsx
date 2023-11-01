import { useState } from "react";
import useTodoList from "../hooks/useTodoList";
import Toast from "../components/Toast";

const TodoList = () => {
  const [page, setPage] = useState(0);
  const { data: todo, status, error, isFetching } = useTodoList(page);

  return (
    <main className="bg-app h-screen grid grid-cols-todo gap-5 justify-center py-7">
      {status === "pending" && <LoadingTodos />}
      <Toast state={{ status: "error", message: "error occured" }} />
    </main>
  );
};

const LoadingTodos = () => {
  const fakeArr = [...Array(100).keys()];

  return (
    <>
      {fakeArr.map((id) => (
        <div
          key={id}
          className="bg-white shadow-todo py-5 px-4 h-80 rounded-2xl animate-pulse"
        >
          <div className="h-6 rounded-lg bg-slate-300 mb-8"></div>
          <div className="h-6 rounded-lg bg-slate-300 mb-2"></div>
          <div className="flex justify-center items-center mb-2 gap-x-1">
            <div className="h-6 rounded-lg bg-slate-300 basis-5 grow"></div>
            <div className="h-6 rounded-lg bg-slate-300 basis-5 flex-1"></div>
          </div>
          <div className="h-6 rounded-lg bg-slate-300 mb-2"></div>
          <div className="h-6 rounded-lg bg-slate-300 mb-2"></div>
          <div className="h-6 rounded-lg bg-slate-300 mb-2"></div>
          <div className="flex justify-center items-center mb-2 gap-x-1">
            <div className="h-6 rounded-lg bg-slate-300 grow"></div>
            <div className="h-6 rounded-lg bg-slate-300 basis-5"></div>
          </div>
          <div className="h-6 rounded-lg bg-slate-300 mb-2"></div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
