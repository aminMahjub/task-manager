import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PriorityType } from "../types";
import { ReactComponent as RightArrowIcon } from "../../public/svg/arrow-right-icon.svg";
import { ReactComponent as LeftArrowIcon } from "../../public/svg/arrow-left-icon.svg";

const DropBox = () => {
  const [openSortBy, setOpenSortBy] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetSerachParams = (priorityNum: PriorityType | null) => {
    setSearchParams((prevParam) => {
      if (priorityNum === null) {
        prevParam.delete("priority");
      } else {
        prevParam.set("priority", String(priorityNum));
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
        onClick={() => handleSetSerachParams(1)}
      >
        High Priority (1)
      </div>
      <div
        className={`text-base font-roboto-medium cursor-pointer mb-6 ${
          searchParams.get("priority") === "2" && "text-prioty-text-2"
        }`}
        onClick={() => handleSetSerachParams(2)}
      >
        Middle Priority (2)
      </div>
      <div
        className={`text-base font-roboto-medium cursor-pointer mb-6 ${
          searchParams.get("priority") === "3" && "text-prioty-text-3"
        }`}
        onClick={() => handleSetSerachParams(3)}
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

  return (
    <>
      <div
        className="bg-white shadow-dropdown px-6 py-5 rounded-2xl absolute right-6 top-11"
        onClick={(e) => e.stopPropagation()}
      >
        {!openSortBy ? (
          <>
            <div
              className="font-roboto-medium text-base mb-6 cursor-pointer"
              onClick={() => setOpenSortBy(true)}
            >
              Sort by <RightArrowIcon className="inline-block" />
            </div>
            <div className="text-base font-roboto-medium cursor-pointer">
              Delete All todo
            </div>
          </>
        ) : (
          sortyByContent
        )}
      </div>
    </>
  );
};

export default DropBox;
