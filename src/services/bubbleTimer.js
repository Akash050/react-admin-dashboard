import { client } from "./index";
const token = localStorage.getItem("token");

export const changeTaskStatus = (params) =>
    client.post("api/v1/taskStatus", params, {
        headers: { Authorization: "Bearer " + token },
    });

// export const deleteTask = (id) =>
//     client.delete(`api/v1/task/${id}`, {
//         headers: { Authorization: "Bearer " + token },
//     });
