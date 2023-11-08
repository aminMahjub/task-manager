import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDeleteAllTodo from "../hooks/useDeleteAllTodo";
import Toast from "./Toast";

import { PriorityType } from "../types";
import { ReactComponent as RightArrowIcon } from "../../public/svg/arrow-right-icon.svg";
import { ReactComponent as LeftArrowIcon } from "../../public/svg/arrow-left-icon.svg";

const DropBox = () => {
  const [openSortBy, setOpenSortBy] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate, status, error } = useDeleteAllTodo();

  const handleSetSerachParams = (priorityNum: PriorityType | null) => {
    setSearchParams((prevParam) => {
      if (priorityNum === null) {
        prevParam.delete("priority");
      } else {
        prevParam.set("priority", priorityNum);
      }

      return prevParam;
    });
  };

  const sortyByContent = (
    <>
      <div
        className="font-roboto-medium text-base mb-6 cursor-pointer text-gray-400"
        onClick={() => setOpenSortBy(false)}
      >
        <LeftArrowIcon className="inline-block pb-1" />
        Sort by
      </div>
      <div
        className={`text-base font-roboto-medium cursor-pointer mb-6 ${
          searchParams.get("priority") === "1" && "text-prioty-text-1"
        }`}
        onClick={() => handleSetSerachParams("1")}
      >
        High Priority (1)
      </div>
      <div
        className={`text-base font-roboto-medium cursor-pointer mb-6 ${
          searchParams.get("priority") === "2" && "text-prioty-text-2"
        }`}
        onClick={() => handleSetSerachParams("2")}
      >
        Middle Priority (2)
      </div>
      <div
        className={`text-base font-roboto-medium cursor-pointer mb-6 ${
          searchParams.get("priority") === "3" && "text-prioty-text-3"
        }`}
        onClick={() => handleSetSerachParams("3")}
      >
        low Priority (3)
      </div>
      <div
        className="text-base font-roboto-medium cursor-pointer"
        onClick={() => handleSetSerachParams(null)}
      >
        Clear filter
      </div>
    </>
  );

  const handleOnDeleteAllTodo = () =>
    mutate({
      priority: "1",
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false,
      description: "Viverra turpis sed eu curabitur sed eget malesuada sed.",
    });

  return (
    <div className="bg-white shadow-dropdown px-6 py-5 rounded-2xl absolute right-6 top-11">
      {!openSortBy ? (
        <>
          <div
            className="font-roboto-medium text-base mb-6 cursor-pointer"
            onClick={() => setOpenSortBy(true)}
          >
            Sort by <RightArrowIcon className="inline-block" />
          </div>
          <div
            className="text-base font-roboto-medium cursor-pointer"
            onClick={handleOnDeleteAllTodo}
          >
            {status === "pending" ? "Deleting all todo" : "Delete All todo"}
          </div>
        </>
      ) : (
        sortyByContent
      )}

      {status === "success" && (
        <Toast
          state={{ status: "success", message: "All todo deleted successfuly" }}
        />
      )}
      {status === "error" && (
        <Toast state={{ status: "error", message: error.message }} />
      )}
    </div>
  );
};

export default DropBox;
