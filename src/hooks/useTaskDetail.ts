import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { Task } from "../types";

const taskDetailQuery = (taskId: number) => ({
  queryKey: ["tasks", "detail", taskId],
  queryFn: () => fecthTask(taskId),
  staleTime: 2 * 1000,
});

const fecthTask = (id: number) =>
  api.get(`/tasks/${id}`).then((res) => res.data) as Promise<Task>;

const useTaskDetail = (taskId: number) => {
  return useQuery({
    queryKey: ["tasks", { taskId }],
    queryFn: () => fecthTask(taskId),
    gcTime: 2 * 10000,
  });
};

export default useTaskDetail;
