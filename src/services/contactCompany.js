import { client } from "./index";
const token = localStorage.getItem("token");

export const newCompany = (params) =>
  client.post("api/v1/contactCompany", params, {
    headers: { Authorization: "Bearer " + token },
  });

export const getCompany = (page, size, search) =>
  client.get(`api/v1/contactCompany/?page=${page}&size=${size}&search=${search}`, {
    headers: { Authorization: "Bearer " + token },
  });

export const getCompanyById = (id) =>
  client.get(`api/v1/contactCompany/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });

export const updateCompany = (params) =>
  client.put("api/v1/contactCompany", params, {
    headers: { Authorization: "Bearer " + token },
  });

export const deleteCompany = (id) =>
  client.delete(`api/v1/contactCompany/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });

export const uploadImage = (id, formData) =>
  client.post(`api/v1/contactCompany/profile/${id}`, formData, {
    headers: { 
      Authorization: "Bearer " + token, 
      'content-type': 'multipart/form-data'
     },
  });

  // http://copropertybackend.anviam.in/api/v1/company/avatar/3bf61aba-d800-4df8-b1a8-5c041e7a8c59
  // {{coproperty}}api/v1/contactCompany/profile/3bf61aba-d800-4df8-b1a8-5c041e7a8c59