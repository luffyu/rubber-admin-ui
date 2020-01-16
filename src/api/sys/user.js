import request from '@/utils/request';
import global from '@/utils/Global';


export  function queryList(query) {
  return request({
    url: global.rubberBasePath + '/sys/user/list',
    method: 'get',
    params: {
      'json':encodeURI(JSON.stringify(query))
    }
  })
}


/**
 * 新增用户
 * @param params
 */
export  function add(params) {
  return request({
    url: global.rubberBasePath + '/sys/user/add',
    method: 'post',
    data: params
  })
}

/**
 * 编辑用户
 * @param params
 */
export  function edit(userId,params) {
  return request({
    url: global.rubberBasePath + '/sys/user/'+userId+'/update',
    method: 'post',
    data: params
  })
}

/**
 * 删除菜单
 * @param menuId 菜单id
 */
export  function del(userId) {
  return request({
    url: global.rubberBasePath + '/sys/user/'+userId+'/del',
    method: 'post',
  })
}



export default {
  queryList
}
