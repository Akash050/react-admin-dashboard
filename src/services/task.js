import { client } from "./index";
const token = localStorage.getItem("token");

export const newTask = (params) =>
  client.post("api/v1/task", params, {
    headers: { Authorization: "Bearer " + token },
  });

export const getTasks = (params) =>
  client.get("api/v1/task", {
    headers: { Authorization: "Bearer " + token },
  });
export const getTopThreeTasks = (params) =>
  client.get("api/v1/tasks/topThreeTasks", {
    headers: { Authorization: "Bearer " + token },
  });

export const updateTask = (params) =>
  client.put("api/v1/task", params, {
    headers: { Authorization: "Bearer " + token },
  });

export const deleteTask = (id) =>
  client.delete(`api/v1/task/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
