import { client } from "./index";

// export const newCity = (params) => client.post("city/newcity", params);
// export const updateCity = (params) => client.patch("city/updatecity", params);
// export const deleteCity = (_id) => client.post(`city/deletecity/${_id}`);
export const users = () => client.get("users/userslist");
export const user = () => client.get("users/getuser");
