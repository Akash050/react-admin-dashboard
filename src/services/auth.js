import { client } from "./index";

export const forgetPassword = (payload) => client.post(`api/v1/forgetPassword`,payload);
export const resetPassword = (payload) =>client.post(`api/v1/resetPassword`, payload);
