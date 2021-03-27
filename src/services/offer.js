import { client } from "./index";

export const newOffer = (params) => client.post("offer/newoffer", params);
// export const updateCity = (params) => client.patch("city/updatecity", params);
// export const deleteCity = (_id) => client.post(`city/deletecity/${_id}`);
export const offerlist = () => client.get("offer/");
