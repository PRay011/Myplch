import { request } from "../utils/request";

//导出login方法，供其它地方使用
export function submitScores(data) {
  return request({
    url: "/score",
    method: "post",
    data,
  });
}
