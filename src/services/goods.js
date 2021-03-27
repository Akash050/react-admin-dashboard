import { client } from "./index";

export const addGoods = (params) => client.post("goodsType/", params);
export const updateGoods = (params) => client.patch(`goodsType/${_id}`, params);
export const deleteGoods = (_id) => client.delete(`goodsType/${_id}`);
export const goodsList = () => client.get("goodsType/");
export const goods = () => client.get(`goodsType/${_id}`);
