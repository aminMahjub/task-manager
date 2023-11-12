import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import useTaskChangeOption from "../hooks/useTaskChangeOption";
import useTaskDetail from "../hooks/useTaskDetail";
import useTaskDelete from "../hooks/useTaskDelete";

import { ReactComponent as ChaveronLeft } from "../../public/svg/chavron-left-icon.svg";
import { ReactComponent as SaveTodo } from "../../public/svg/save-todo-icon.svg";
import { ReactComponent as TrashIcon } from "../../public/svg/trash-icon.svg";

import Toast from "../components/Toast";
import LoadingIndicator from "../components/LoadingIndicator";
import PriorityBadge from "../components/PriorityBadge";

import { PriorityType, Task } from "../types";

const TaskDetail = () => {
  const [showPriorityBox, setPriorityBox] = useState(false);
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    data: task,
    status: taskStatus,
    error: taskError,
  } = useTaskDetail(Number(id));

  const {
    mutate: changeTask,
    status: taskChangeStatus,
    error: taskChangeErorr,
  } = useTaskChangeOption();

  const {
    mutate: deleteTask,
    status: deleteTaskStatus,
    error: deleteTaskError,
  } = useTaskDelete();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleOnEditTask = () =>
    changeTask({
      ...task,
      title: titleRef.current?.textContent,
      description: descriptionRef.current?.textContent,
    } as Task);

  const handleOnPriorityChange = (priority: PriorityType) =>
    changeTask({
      ...task,
      priority,
    } as Task);

  if (taskStatus === "pending") {
    return (
      <div className="h-screen">
        <LoadingIndicator />
      </div>
    );
  }

  if (taskStatus === "error") {
    return <Toast state={{ status: "error", message: taskError.message }} />;
  }

  return (
    <div className="h-screen relative">
      <header className="px-4 py-5 shadow-header flex items-center justify-between bg-white">
        <div className="flex justify-center items-center gap-x-7">
          <Link
            to={
              state.priorityFilter ? `/?priority=${state.priorityFilter}` : "/"
            }
            title="back to all tasks"
          >
            <ChaveronLeft />
          </Link>
          <h1 className="text-xl font-roboto-medium">Edit</h1>
        </div>
        <div className="flex justify-center items-center gap-x-7">
          <button
            type="button"
            title="save your changes"
            disabled={taskChangeStatus === "pending"}
            onClick={handleOnEditTask}
          >
            <SaveTodo />
          </button>
          <button
            type="button"
            title="delete your todo"
            disabled={deleteTaskStatus === "pending"}
            onClick={() => {
              deleteTask(task?.id as number);
              navigate(
                state.priorityFilter
                  ? `/?priority=${state.priorityFilter}`
                  : "/"
              );
            }}
          >
            <TrashIcon />
          </button>
        </div>
      </header>

      {taskChangeStatus === "error" && (
        <Toast state={{ status: "error", message: taskChangeErorr.message }} />
      )}

      {deleteTaskStatus === "error" && (
        <Toast state={{ status: "error", message: deleteTaskError.message }} />
      )}

      {taskChangeStatus === "success" && (
        <Toast state={{ status: "success", message: "Your task updated" }} />
      )}

      <div className="px-4 py-6">
        <section className="max-h-[778px] h-full shadow-task bg-white rounded-2xl px-4 py-5 overflow-y-auto">
          <h2
            className="text-xl font-roboto-medium"
            suppressContentEditableWarning
            ref={titleRef}
            contentEditable
          >
            {task.title}
          </h2>
          <p
            className="text-base font-roboto-regular mt-2"
            suppressContentEditableWarning
            contentEditable
            ref={descriptionRef}
          >
            {task.description}
          </p>
        </section>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => setPriorityBox(!showPriorityBox)}
      >
        <PriorityBadge priority={task.priority} />
      </div>

      {showPriorityBox && (
        <div className="flex items-center justify-center gap-x-2">
          <div onClick={() => handleOnPriorityChange(1)}>
            <PriorityBadge priority={1} />
          </div>
          <div onClick={() => handleOnPriorityChange(2)}>
            <PriorityBadge priority={2} />
          </div>
          <div onClick={() => handleOnPriorityChange(3)}>
            <PriorityBadge priority={3} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
