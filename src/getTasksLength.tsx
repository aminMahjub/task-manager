import api from "./api/api";

const getTasksLength = async () => {
  return api.get("/tasks");
};

export default getTasksLength;
