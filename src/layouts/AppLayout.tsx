import { Outlet } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../public/svg/search-icon.svg";
import { ReactComponent as VerticalOptionIcon } from "../../public/svg/vertical-option-icon.svg";

const AppLayout = () => {
  return (
    <div className="bg-app h-screen">
      <header className="px-5 py-4 shadow-header flex justify-between items-center">
        <h1 className="font-roboto-medium text-main-text text-xl">Todos</h1>

        <div className="flex justify-center items-center gap-x-4">
          <button type="button" title="search button">
            <SearchIcon />
          </button>
          <button type="button" title="options button">
            <VerticalOptionIcon />
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default AppLayout;
