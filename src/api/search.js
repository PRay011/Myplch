import { request } from "../utils/request";

export function hotWords() {
  return request({
    url: "/hotword",
    method: "get",
  });
}

export function search(data) {
  return request({
    url: `/compkey?seed=${data}`,
    method: "get",
    data,
  });
}
