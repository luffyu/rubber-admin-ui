import request from '@/utils/request';
import global from '@/utils/Global';


export  function queryList(query) {
  return request({
    url: global.rubberBasePath + '/sys/role/list',
    method: 'get',
    params: {
      'json':encodeURI(JSON.stringify(query))
    }
  })
}



/**
 * 新增菜单
 * @param params
 */
export  function add(params) {
  return request({
    url: global.rubberBasePath + '/sys/role/add',
    method: 'post',
    data: params
  })
}

/**
 * 编辑菜单
 * @param params
 */
export  function edit(id,params) {
  return request({
    url: global.rubberBasePath + '/sys/role/'+id+'/update',
    method: 'post',
    data: params
  })
}

/**
 * 删除菜单
 * @param menuId 菜单id
 */
export  function del(id) {
  return request({
    url: global.rubberBasePath + '/sys/role/'+id+'/del',
    method: 'post',

  })
}


export default {
  queryList,
  add,
  edit,
  del
}
