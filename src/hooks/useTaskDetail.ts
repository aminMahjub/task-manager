import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { Task } from "../types";

const fecthTask = (id: string) =>
  api.get(`/tasks/${id}`).then((res) => res.data) as Promise<Task>;

const useTaskDetail = (taskId: string) => {
  return useQuery({
    queryKey: ["tasks", { taskId }],
    queryFn: () => fecthTask(taskId),
    gcTime: 2 * 10000,
  });
};

export default useTaskDetail;
