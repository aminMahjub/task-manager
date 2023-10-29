import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { ReactComponent as SearchIcon } from "../../public/svg/search-icon.svg";
import { ReactComponent as VerticalOptionIcon } from "../../public/svg/vertical-option-icon.svg";
import { ReactComponent as ArrowBackIcon } from "../../public/svg/arrow-back-icon.svg";
import { ReactComponent as ShadowCloseIcon } from "../../public/svg/shadow-close-icon.svg";
import { ReactComponent as CloseIcon } from "../../public/svg/close-icon.svg";
import { ReactComponent as RightArrowIcon } from "../../public/svg/arrow-right-icon.svg";
import { ReactComponent as LeftArrowIcon } from "../../public/svg/arrow-left-icon.svg";

type FilterByPriotiry = "1" | "2" | "3";

const DropBox = () => {
  const [openSortBy, setOpenSortBy] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetSerachParams = (priorityNum: FilterByPriotiry | null) => {
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

  return (
    <div className="shadow-dropdown px-6 py-5 bg-white rounded-2xl absolute right-6 top-11">
      {!openSortBy ? (
        <>
          <div
            className="font-roboto-medium text-base mb-6 cursor-pointer"
            onClick={() => setOpenSortBy(true)}
          >
            Sort by <RightArrowIcon className="inline-block" />
          </div>
          <div className="text-base font-roboto-medium cursor-pointer">
            Delete all
          </div>
        </>
      ) : (
        sortyByContent
      )}
    </div>
  );
};

const SearchTabContent = ({
  onExitFromSearch,
  onOpenDropdows,
}: {
  onExitFromSearch: () => void;
  onOpenDropdows: () => void;
}) => {
  const [searchTodo, setSearchTodo] = useState("");

  const isSearchInputEmpty = searchTodo.length === 0;

  return (
    <>
      <div className="flex items-center justify-center gap-x-4 basis-1/2">
        <button
          type="button"
          title="exit from search"
          onClick={() => {
            onExitFromSearch();
            setSearchTodo("");
          }}
        >
          <ArrowBackIcon />
        </button>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTodo(e.currentTarget.value)}
          value={searchTodo}
          className="w-full text-lg font-roboto-regular placeholder:font-roboto-regular placeholder:text-lg focus:outline-none"
        />
      </div>
      <div className="flex items-center justify-center gap-x-4">
        <button
          type="button"
          title={isSearchInputEmpty ? "disable close icon" : "empty the search"}
          disabled={isSearchInputEmpty}
          onClick={() => setSearchTodo("")}
        >
          {isSearchInputEmpty ? <ShadowCloseIcon /> : <CloseIcon />}
        </button>

        <button type="button" title="options button" onClick={onOpenDropdows}>
          <VerticalOptionIcon />
        </button>
      </div>
    </>
  );
};

const AppLayout = () => {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="relative px-5 py-4 shadow-header flex justify-between items-center">
      {!openSearchBar ? (
        <>
          <h1 className="font-roboto-medium text-main-text text-xl">Todos</h1>

          <div className="flex justify-center items-center gap-x-4">
            <button
              type="button"
              title="search button"
              onClick={() => setOpenSearchBar(true)}
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              title="options button"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <VerticalOptionIcon />
            </button>
          </div>
        </>
      ) : (
        <SearchTabContent
          onExitFromSearch={() => setOpenSearchBar(false)}
          onOpenDropdows={() => setOpenDropdown(!openDropdown)}
        />
      )}

      {openDropdown && <DropBox />}
    </header>
  );
};

export default AppLayout;
