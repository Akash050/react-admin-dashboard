import { client } from "./index";
const token = localStorage.getItem("token");

export const newfollowUp = (params) =>
    client.post("api/v1/addFollowUp", params, {
        headers: { Authorization: "Bearer " + token },
    });

export const getFollowUpsOfUsers = (page, size, search) =>
    client.get(
        `api/v1/addFollowUp/?page=${page}&size=${size}&search=${search}`
        ,
        {
            headers: { Authorization: "Bearer " + token },
        }
    );
export const getFollowUpByProperty = (id) =>
    client.get(
        `api/v1/addFollowUp/property/${id}`
        ,
        {
            headers: { Authorization: "Bearer " + token },
        }
    );
export const getFollowUpById = (id) =>
    client.get(
        `api/v1/addFollowUp/${id}`
        ,
        {
            headers: { Authorization: "Bearer " + token },
        }
    );
export const updatefollowUp = (params) =>
    client.put("api/v1/addFollowUp", params, {
        headers: { Authorization: "Bearer " + token },
    });

export const deletefollowUp = (id) =>
    client.delete(`api/v1/addFollowUp/${id}`, {
        headers: { Authorization: "Bearer " + token },
    });


// export const uploadImage = (id, formData) =>
//     client.post(`api/v1/followUp/images/${id}`, formData, {
//         headers: {
//             Authorization: "Bearer " + token,
//             "content-type": "multipart/form-data; boundary=<calculated when request is sent>",
//         },
//     });

// export const uploadAttachment = (id, formData) =>
//     client.post(`api/v1/followUp/attachments/${id}`, formData, {
//         headers: {
//             Authorization: "Bearer " + token,
//             "content-type": "multipart/form-data; boundary=<calculated when request is sent>",
//         },
//     });

// export const removeAttachment = (id, type) =>
//     client.delete(`api/v1/followUp/deleteFile/${id}?fileType=${type}`, {
//         headers: {
//             Authorization: "Bearer " + token
//         },
//     });