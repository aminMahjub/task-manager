import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { Task } from "../types";
import { AxiosResponse } from "axios";

const fetchCompleteTask = (task: Task) => api.patch(`/tasks/${task.id}`, task);

const useTaskChangeOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => fetchCompleteTask(task),
    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousQuery = queryClient.getQueriesData({
        queryKey: ["tasks"],
        type: "all",
      });

      queryClient.setQueryData(
        previousQuery[0][0],
        (oldData: Task[] | Task) => {
          if (Array.isArray(oldData)) {
            return oldData.map((task) => {
              if (task.id === data.id) {
                return data;
              }

              return task;
            });
          }

          return oldData;
        }
      );

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

export default useTaskChangeOption;
