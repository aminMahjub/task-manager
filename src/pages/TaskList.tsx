import { MouseEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useTaskList from "../hooks/useTaskList";
import useTaskFilter from "../hooks/useTaskFilter";
import Toast from "../components/Toast";
import PriorityBadge from "../components/PriorityBadge";
import TaskListHeader from "../components/TaskListHeader";

import { PriorityType, Task } from "../types";

import { ReactComponent as CheckmarkIcon } from "../../public/svg/checkmark-icon.svg";
import { ReactComponent as EmptyTodoListIcon } from "../../public/svg/no-todo-icon.svg";
import useTaskChangeOption from "../hooks/useTaskChangeOption";
import api from "../api/api";

const TaskList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTodo, setSearchTodo] = useState("");
  const [taskLength, setTaskLength] = useState(-1);

  useEffect(() => {
    api.get("/tasks").then((res) => setTaskLength(res.data.length));
  }, []);

  const priorityFilter = Number(searchParams.get("priority")) as PriorityType;

  return (
    <div className="relative">
      <TaskListHeader
        searchContent={{
          searchTask: searchTodo,
          onSearchChange: (value: string) => setSearchTodo(value),
        }}
      />

      {taskLength !== 0 ? (
        priorityFilter ? (
          <FilteredTasksSection
            priority={priorityFilter}
            searchTitle={searchTodo}
          />
        ) : (
          <TaskListSection
            searchTitle={searchTodo}
            pageSize={Math.ceil(taskLength / 10)}
          />
        )
      ) : (
        <EmptyTasksSection />
      )}

      <Link
        to="/add-task"
        className="fixed bottom-12 right-10 w-14 h-14 bg-btn flex items-center justify-center pb-1 text-3xl text-white rounded-full"
      >
        +
      </Link>
    </div>
  );
};

const EmptyTasksSection = () => {
  return (
    <main className="bg-app relative h-screen grid grid-cols-todo gap-5 justify-center py-7">
      <div className="self-center">
        <EmptyTodoListIcon className="mx-auto" />
        <p className="text-base font-roboto-medium mt-2 text-black opacity-40">
          You have no to-dos
        </p>
      </div>
    </main>
  );
};

const FilteredTasksSection = ({
  priority,
  searchTitle,
}: {
  priority: PriorityType;
  searchTitle: string;
}) => {
  const {
    data: filteredTodo,
    status,
    error,
  } = useTaskFilter(priority, searchTitle);

  return (
    <main className="bg-app relative grid grid-cols-task gap-5 justify-center py-7">
      {status === "error" && (
        <Toast state={{ status: "error", message: error.message }} />
      )}
      {status === "pending" && <LoadingFakeTasks />}
      {status === "success" && (
        <Toast
          state={{
            status: "success",
            message: `The priority ${priority} applied`,
          }}
        />
      )}
      {filteredTodo?.map((filteredTask) => {
        return <TaskBox task={filteredTask} key={filteredTask.id} />;
      })}
    </main>
  );
};

const TaskListSection = ({
  searchTitle,
  pageSize,
}: {
  searchTitle: string;
  pageSize: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: tasks, status, error } = useTaskList(currentPage, searchTitle);

  return (
    <main className="bg-app relative grid grid-cols-task gap-5 justify-center py-7">
      {status === "error" && (
        <Toast state={{ status: "error", message: error.message }} />
      )}

      {status === "pending" && <LoadingFakeTasks />}

      {tasks?.map((task) => {
        return <TaskBox key={task.id} task={task} />;
      })}

      {status !== "pending" && (
        <div className="fixed bottom-2 w-full">
          <section className="flex justify-center items-center gap-x-2">
            <button
              type="button"
              onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
              disabled={currentPage === 1}
              className="flex-none font-roboto-regular text-base py-2 text-center bg-btn w-20 rounded-md text-white disabled:bg-slate-300"
            >
              Previous
            </button>
            <div className="flex justify-center items-center gap-x-1">
              {[...Array(pageSize).keys()].map((pageNumber) => {
                return (
                  <button
                    type="button"
                    key={pageNumber + 1}
                    onClick={() => setCurrentPage(pageNumber + 1)}
                    className={`w-2 h-2 rounded-full ${
                      pageNumber + 1 === currentPage
                        ? "bg-teal-400"
                        : "border border-teal-400"
                    }`}
                    title={String(pageNumber + 1)}
                  ></button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
              disabled={currentPage === pageSize}
              className="flex-none font-roboto-regular disabled:bg-slate-300 text-base py-2 px-2 text-center bg-btn rounded-md text-white"
            >
              Next
            </button>
          </section>
        </div>
      )}
    </main>
  );
};

const LoadingFakeTasks = () => {
  const fakeArr = [...Array(50).keys()];

  return (
    <>
      {fakeArr.map((id) => (
        <div
          key={id}
          className="bg-white shadow-task py-5 px-4 h-80 rounded-2xl animate-pulse"
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

const TaskBox = ({ task }: { task: Task }) => {
  const { mutate, status, error } = useTaskChangeOption();
  const [completeTask, setCompleted] = useState(task.completed);
  const [searchParams, _setSearchParams] = useSearchParams();

  const handleComoleteTask = (e: MouseEvent) => {
    if ((e.target as HTMLAnchorElement).tagName !== "A") {
      setCompleted((completed) => !completed);
      mutate({ ...task, completed: !completeTask });
    }
  };

  return (
    <div
      onClick={handleComoleteTask}
      className={`relative px-4 h-44 py-5 shadow-task rounded-2xl cursor-pointer ${
        completeTask ? "outline-dashed outline-2 outline-green-800" : ""
      }`}
    >
      {completeTask && (
        <div className="absolute top-[-13px] w-28 px-2 flex items-center justify-center gap-x-1 bg-green-300 rounded-xl">
          <CheckmarkIcon />
          <div className=" font-roboto-regular">completed</div>
        </div>
      )}

      {status === "error" && (
        <Toast state={{ status: "error", message: error.message }} />
      )}

      <div className="line-clamp-2 text-base font-roboto-medium mb-2">
        {task.title}
      </div>
      <p className="line-clamp-3 text-xs font-sans font-normal mb-1">
        {task.description}
      </p>
      <div className="absolute bottom-2 right-2 flex justify-between items-center w-full px-4">
        <PriorityBadge priority={task.priority} />
        <Link
          to={`./${task.id}`}
          state={{ priorityFilter: searchParams.get("priority") }}
          className="font-roboto-regular text-sm bg-warning text-center py-[1px] rounded-md w-10 text-white"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default TaskList;
