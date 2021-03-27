import { client } from "./index";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
console.log("role ->", role)

export const newEmployee = (params) =>
  client.post("api/v1/user", params, {
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

// export const getEmployees = (page, size, roleId, search, companyId) =>
//   client.get(
//     `api/v1/users/${role === "SUPER_ADMIN_AS_COMPANY_ADMIN"
//       ? `${companyId}/?page=${page}&size=${size}&search=${search}`
//       : `?page=${page}&size=${size}&search=${search}`
//     }`,
//     {
//       headers: { Authorization: "Bearer " + token },
//     }
//   );
export const getCompanyIdEmployees = (page, size, search, companyId) =>
  client.get(
    `api/v1/users/${companyId}/?page=${page}&size=${size}&search=${search}`
    ,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
export const getEmployees = (page, size, search) =>
  client.get(
    `api/v1/users/?page=${page}&size=${size}&search=${search}`
    ,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
export const updateEmployee = (params) =>
  client.put("/api/v1/user", params, {
    headers: { Authorization: "Bearer " + token },
  });

export const deleteEmployee = (_id) =>
  client.delete(`/api/v1/user/${_id}`, {
    headers: { Authorization: "Bearer " + token },
  });

export const getSalary = (id) => {
  if(role == 'SUPER_ADMIN_AS_COMPANY_ADMIN'){
    let payload = {
      company: localStorage.companyId
    }
    return(client.post(`api/v1/TotalSalary`, payload,  { headers: { Authorization: "Bearer " + token }}))
  }else{
    return(client.get(`api/v1/TotalSalary`, { headers: { Authorization: "Bearer " + token }}))
  }
}

export const uploadProfile = (id, formData) =>
  client.post(`api/v1/upload/profile/${id}`, formData, {
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data",
    },
  });
