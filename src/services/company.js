import { client } from "./index";
const token = localStorage.getItem("token");

export const newCompany = (params) =>
  //console.log("params", params);
  client.post("api/v1/company", params, {
    headers: { Authorization: "Bearer " + token },
  });

export const getCompany = (page, size, search) =>
  client.get(`api/v1/company/?page=${page}&size=${size}&search=${search}`, {
    headers: { Authorization: "Bearer " + token },
  });

export const getCompanyById = (id) =>
  client.get(`api/v1/company/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });

export const updateCompany = (params) =>
  client.put("api/v1/company", params, {
    headers: { Authorization: "Bearer " + token },
  });

export const deleteCompany = (id) =>
  client.delete(`api/v1/company/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });

export const uploadProfile = (id, formData) =>
  client.post(`api/v1/company/avatar/${id}`, formData, {
    headers: { Authorization: "Bearer " + token, 'content-type': 'multipart/form-data' },
  });
