import request from '@/utils/request';
import global from '@/utils/Global';


export  function queryList(query) {
  return request({
    url: global.rubberBasePath + '/sys/menu/list',
    method: 'get',
    params: {
      'json':encodeURI(JSON.stringify(query))
    }
  })
}


export  function queryTree() {
  return request({
    url: global.rubberBasePath + '/sys/menu/tree',
    method: 'get',
  })
}

/**
 * 新增菜单
 * @param params
 */
export  function add(params) {
  return request({
    url: global.rubberBasePath + '/sys/menu/add',
    method: 'post',
    data: params
  })
}

/**
 * 编辑菜单
 * @param params
 */
export  function edit(menuId,params) {
  return request({
    url: global.rubberBasePath + '/sys/menu/'+menuId+'/update',
    method: 'post',
    data: params
  })
}

/**
 * 删除菜单
 * @param menuId 菜单id
 */
export  function del(menuId) {
  return request({
    url: global.rubberBasePath + '/sys/menu/'+menuId+'/del',
    method: 'post',

  })
}

export default {
  queryList,
  queryTree,
  add,
  edit,
  del
}
