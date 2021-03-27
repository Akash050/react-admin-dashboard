import { client } from "./index";
const token = localStorage.getItem("token");

export const getProfile = () =>
  client.get("api/v1/getProfile", {
    headers: { Authorization: "Bearer " + token },
  });

export const updateProfile = (params) =>
  client.put("api/v1/company/update", params, {
    headers: { Authorization: "Bearer " + token },
  });
