import { client } from "./index";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const companyId = localStorage.getItem("companyId");

export const newContact = (params) =>
    client.post("api/v1/contact", params, {
        headers: { Authorization: "Bearer " + token },
    });

// const roleBased = (page, size, roleId, search) => {
//   console.log("company id", companyId);
//   if (role === "SUPER_ADMIN_AS_COMPANY_ADMIN") {
//     console.log("inside service if");
//     return `api/v1/users/fdd2f81f-6e8e-4224-9429-514935df043a`;
//   } else {
//     return `api/v1/users?page=${page}&size=${size}&roleId=${roleId}&search=${search}`;
//   }
// };

export const getContacts = (page, size, search) =>
    client.get(`api/v1/contacts?page=${page}&size=${size}&search=${search}`,
        {
            headers: { Authorization: "Bearer " + token },
        }
    );

export const updateContact = (params) =>
    client.put("/api/v1/contact", params, {
        headers: { Authorization: "Bearer " + token },
    });

export const deleteContact = (id) =>
    client.delete(`api/v1/contact/${id}`, {
        headers: { Authorization: "Bearer " + token },
    });



export const uploadProfile = (id, formData) =>
    client.post(`api/v1/upload/profileConatct/${id}`, formData, {
        headers: {
            Authorization: "Bearer " + token,
            "content-type": "multipart/form-data",
        },
    });
