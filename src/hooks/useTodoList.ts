import {
  QueryFunctionContext,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import api from "../api/api";

const fetchTodoList = ({ queryKey }: QueryFunctionContext) =>
  api.get("/todo", {
    params: {
      _limit: 10,
      _page: queryKey[1],
    },
  });

const useTodoList = (page: number) => {
  return useQuery({
    queryKey: ["todo", page],
    queryFn: fetchTodoList,
    placeholderData: keepPreviousData,
  });
};

export default useTodoList;
