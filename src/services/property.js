import { client } from "./index";
const token = localStorage.getItem("token");

export const newProperty = (params) =>
  client.post("api/v1/property", params, {
    headers: { Authorization: "Bearer " + token },
  });

export const getProperties = (page, size, search) =>
  client.get(
    `api/v1/properties/?page=${page}&size=${size}&search=${search}`
    ,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
export const updateProperty = (params) =>
  client.put("api/v1/property", params, {
    headers: { Authorization: "Bearer " + token },
  });

export const deleteProperty = (id) =>
  client.delete(`api/v1/property/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });


export const uploadImage = (id, formData) =>
  client.post(`api/v1/property/images/${id}`, formData, {
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data; boundary=<calculated when request is sent>",
    },
  });

  export const uploadAttachment = (id, formData) =>
  client.post(`api/v1/property/attachments/${id}`, formData, {
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data; boundary=<calculated when request is sent>",
    },
  });

  export const removeAttachment = (id, type) =>
  client.delete(`api/v1/property/deleteFile/${id}?fileType=${type}`, {
    headers: {
      Authorization: "Bearer " + token
    },
  });