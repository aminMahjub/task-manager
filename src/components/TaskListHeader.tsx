import { useState } from "react";
import DropBox from "./DropBox";

import { ReactComponent as SearchIcon } from "../../public/svg/search-icon.svg";
import { ReactComponent as VerticalOptionIcon } from "../../public/svg/vertical-option-icon.svg";
import { ReactComponent as ArrowBackIcon } from "../../public/svg/arrow-back-icon.svg";
import { ReactComponent as ShadowCloseIcon } from "../../public/svg/shadow-close-icon.svg";
import { ReactComponent as CloseIcon } from "../../public/svg/close-icon.svg";

const MainTaskHeader = ({
  onOpenSearchTab,
}: {
  onOpenSearchTab: () => void;
}) => {
  return (
    <>
      <h1 className="font-roboto-medium text-main-text text-xl">Tasks</h1>

      <div className="flex justify-center items-center gap-x-4">
        <button type="button" title="search button" onClick={onOpenSearchTab}>
          <SearchIcon />
        </button>
      </div>
    </>
  );
};

const TaskListHeader = ({
  searchContent,
}: {
  searchContent: {
    searchTask: string;
    onSearchChange: (value: string) => void;
  };
}) => {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { onSearchChange, searchTask } = searchContent;
  const isSearchInputEmpty = searchTask.length === 0;

  return (
    <header className="sticky z-20 bg-white top-0 px-5 py-4 shadow-header flex justify-between items-center gap-x-2">
      <div className="flex justify-between items-center flex-grow">
        {!openSearchBar ? (
          <MainTaskHeader onOpenSearchTab={() => setOpenSearchBar(true)} />
        ) : (
          <>
            <div className="flex items-center justify-center gap-x-4 basis-1/2">
              <button
                type="button"
                title="exit from search"
                onClick={() => {
                  setOpenSearchBar(false);
                  onSearchChange("");
                }}
              >
                <ArrowBackIcon />
              </button>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearchChange(e.currentTarget.value)}
                value={searchTask}
                className="w-full text-lg font-roboto-regular placeholder:font-roboto-regular placeholder:text-lg focus:outline-none"
              />
            </div>
            <button
              type="button"
              title={
                isSearchInputEmpty ? "disable close icon" : "empty the search"
              }
              disabled={isSearchInputEmpty}
              onClick={() => onSearchChange("")}
            >
              {isSearchInputEmpty ? <ShadowCloseIcon /> : <CloseIcon />}
            </button>
          </>
        )}
      </div>

      <button
        type="button"
        title="options button"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <VerticalOptionIcon />
      </button>
      {openDropdown && <DropBox />}
    </header>
  );
};

export default TaskListHeader;
