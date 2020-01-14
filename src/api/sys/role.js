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


export default {
  queryList
}
