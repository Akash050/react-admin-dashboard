import { client } from "./index";

// export const newCity = (params) => client.post("city/newcity", params);
// export const updateCity = (params) => client.patch("city/updatecity", params);
export const deleteadmin = (_id) => client.delete(`admin/delete/${_id}`);
export const createadmin = (params) => client.post("admin/create", params);

export const loginadmin = (params) => client.post("auth/login", params);
export const getadmins = () => client.post("admin/");
