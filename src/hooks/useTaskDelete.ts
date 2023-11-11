import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { Task } from "../types";
import { AxiosResponse } from "axios";

const fetchDeleteTask = (taskId: number) => api.put(`/tasks/${taskId}`, null);
const useTaskDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => fetchDeleteTask(taskId),
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: ["tasks", { taskId: data }] });
      const previousQuery = queryClient.getQueriesData({ queryKey: ["tasks"] });

      queryClient.setQueryData(previousQuery[0][0], (oldData: Task[]) => {
        return oldData.filter((task) => task.id !== data);
      });

      return {
        previousData: { data: previousQuery[0][1], query: previousQuery[0][0] },
      };
    },

    onError: (_error, _data, context) => {
      queryClient.setQueryData(
        ["tasks", context?.previousData.query],
        (context?.previousData.data as AxiosResponse<Task[]>).data
      );
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export default useTaskDelete;
