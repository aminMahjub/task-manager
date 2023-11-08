import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { PriorityType, Task } from "../types";
import api from "../api/api";
import { AxiosResponse } from "axios";

const fetchTasksByFilter = ({ queryKey }: QueryFunctionContext) => {
  const [_queryKey, priorityType, title_like] = [
    ...queryKey,
    queryKey[2] || null,
  ];

  console.log(_queryKey, priorityType, title_like);

  return api.get("/tasks", {
    params: {
      priority: priorityType,
      title_like,
    },
  });
};

const useTaskFilter = (priority: PriorityType, searchTitle?: string) => {
  return useQuery<AxiosResponse<Task[]>>({
    queryKey: searchTitle
      ? ["tasks", priority, searchTitle]
      : ["tasks", priority],
    queryFn: fetchTasksByFilter,
    enabled: !!priority,
    gcTime: searchTitle ? 0 : 5 * 10000,
  });
};

export default useTaskFilter;
