import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../api/api";

import { Task } from "../types";

const fetchTaskList = (page: number, searchTitle?: string) => {
  return api
    .get("/tasks", {
      params: {
        _limit: 10,
        _page: page,
        title_like: searchTitle,
      },
    })
    .then((res) => res.data) as Promise<Task[]>;
};

const useTaskList = (page: number, searchTitle?: string) => {
  return useQuery({
    queryKey: ["tasks", { page }, { searchTitle }],
    queryFn: () => fetchTaskList(page, searchTitle),
    placeholderData: keepPreviousData,
    gcTime: searchTitle ? 0 : 5 * 10000,
  });
};

export default useTaskList;
