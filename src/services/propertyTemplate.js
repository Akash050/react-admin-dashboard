import { client } from "./index";
const token = localStorage.getItem("token");
export const newPropertyTemplate = (params) =>
    client.post("api/v1/propertyTemplate", params, {
        headers: { Authorization: "Bearer " + token },
    });
export const getPropertyTemplates = (page, size, search) =>
    client.get(
        `api/v1/propertyTemplate/?page=${page}&size=${size}&search=${search}`
        ,
        {
            headers: { Authorization: "Bearer " + token },
        }
    );
export const updateProperty = (params) =>
    client.put("api/v1/propertyTemplate", params, {
        headers: { Authorization: "Bearer " + token },
    });
export const deleteProperty = (id) =>
    client.delete(`api/v1/propertyTemplate/${id}`, {
        headers: { Authorization: "Bearer " + token },
    });
export const uploadImage = (id, formData) =>
    client.post(`api/v1/propertyTemplate/profile/${id}`, formData, {
        headers: {
            Authorization: "Bearer " + token,
            "content-type": "multipart/form-data",
        },
    });