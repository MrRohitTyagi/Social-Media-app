import { caller } from "../utils/axiosInstance";
const base = "user/";

export async function getUser() {
  const { data } = await caller("get", base + "get");
  return data?.user || {};
}
