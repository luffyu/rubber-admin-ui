import request from '@/utils/request';
import global from '@/utils/Global';


export  function queryList(query) {
  return request({
    url: global.rubberBasePath + '/sys/user/list',
    method: 'get',
    params: query
  })
}


export default {
  queryList
}
