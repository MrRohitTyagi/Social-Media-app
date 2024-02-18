import { caller } from "@/utils/axiosInstance";

export async function Login(payload) {
  const { data } = await caller("post", "login", payload);
  return data;
}
