import { request } from '../utils/request';

export function test() {
    return request({
        url: '/fleet/team',
        method: 'get',
    })
}