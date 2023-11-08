import {
  QueryFunctionContext,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import api from "../api/api";

import { Task } from "../types";
import { AxiosResponse } from "axios";

const fetchTaskList = ({ queryKey }: QueryFunctionContext) => {
  const [_queryKey, page, searchTitle] = [...queryKey, queryKey[2] || null];

  return api.get("/tasks", {
    params: {
      _limit: 10,
      _page: page,
      title_like: searchTitle,
    },
  });
};

const useTaskList = (page?: number, searchTitle?: string) => {
  return useQuery<AxiosResponse<Task[]>>({
    queryKey: searchTitle ? ["tasks", page, searchTitle] : ["tasks", page],
    queryFn: fetchTaskList,
    placeholderData: keepPreviousData,
    gcTime: searchTitle ? 0 : 5 * 10000,
  });
};

export default useTaskList;
