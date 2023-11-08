import { useParams } from "react-router-dom";
import useTaskDetail from "../hooks/useTaskDetail";
import LoadingIndicator from "../components/LoadingIndicator";

import { ReactComponent as ChaveronLeft } from "../../public/svg/chavron-left-icon.svg";
import { ReactComponent as SaveTodo } from "../../public/svg/save-todo-icon.svg";
import { ReactComponent as TrashIcon } from "../../public/svg/trash-icon.svg";

import { useRef } from "react";
import Toast from "../components/Toast";

const TaskDetail = () => {
  const { id } = useParams() as { id: string };
  const { data: task, status, error } = useTaskDetail(Number(id));

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="h-screen relative">
      <header className="px-4 py-5 shadow-header flex items-center justify-between bg-white">
        <div className="flex justify-center items-center gap-x-7">
          <button type="button" title="back to all tasks">
            <ChaveronLeft />
          </button>
          <h1 className="text-xl font-roboto-medium">Edit</h1>
        </div>
        <div className="flex justify-center items-center gap-x-7">
          <button type="button" title="save your changes">
            <SaveTodo />
          </button>
          <button type="button" title="delete your todo">
            <TrashIcon />
          </button>
        </div>
      </header>

      {status === "error" && (
        <Toast state={{ status: "error", message: error.message }} />
      )}

      <div className="px-4 py-6">
        <section className="max-h-[778px] h-full shadow-task bg-white rounded-2xl px-4 py-5 overflow-y-auto">
          {status === "pending" ? (
            <LoadingIndicator />
          ) : (
            <>
              <h2
                className="text-xl font-roboto-medium"
                suppressContentEditableWarning
                ref={titleRef}
                contentEditable
              >
                {task?.title}
              </h2>
              <p
                className="text-base font-roboto-regular mt-2"
                suppressContentEditableWarning
                contentEditable
                ref={descriptionRef}
              >
                {task?.description}
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default TaskDetail;
