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


export default {
  queryList,
  queryTree
}
