import { request } from "../utils/request";

//导出login方法，供其它地方使用
export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
