import request from '@/utils/request';

/**
 * 请求登陆接口
 * 返回登陆的值
 * @param user 当前的用户信息
 */
export function login(user) {
  return request({
    url: '/login',
    method: 'post',
    params: user
  })
}
