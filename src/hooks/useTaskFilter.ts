import { useQuery } from "@tanstack/react-query";
import { PriorityType, Task } from "../types";
import api from "../api/api";

const fetchTasksByFilter = (priority: PriorityType, searchKey?: string) => {
  return api
    .get("/tasks", {
      params: {
        priority,
        title_like: searchKey,
      },
    })
    .then((res) => res.data) as Promise<Task[]>;
};

const useTaskFilter = (priority: PriorityType, searchTitle?: string) => {
  return useQuery({
    queryKey: ["tasks", { priority }, { searchKey: searchTitle }],
    queryFn: () => fetchTasksByFilter(priority, searchTitle),
    gcTime: searchTitle ? 0 : 5 * 10000,
  });
};

export default useTaskFilter;
