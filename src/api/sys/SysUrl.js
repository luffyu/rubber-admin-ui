/**
 * %s 替换符
 * @type {{sysRole: {add: string, edit: string, del: string, pageList: string}, sysPermissionDict: {add: string, edit: string, del: string, pageList: string}, sysUser: {add: string, edit: string, del: string, pageList: string}, sysMenu: {add: string, edit: string, del: string, pageList: string}, sysDept: {add: string, edit: string, del: string, pageList: string}}}
 */
const allUrl = {
  sysRole:{
    pageList:"/sys/role/list",
    add:"/sys/role/add",
    edit:"/sys/role/%s/update",
    del:"/sys/role/%s/del",
  },
  sysUser:{
    pageList:"/sys/user/list",
    add:"/sys/user/add",
    edit:"/sys/user/%s/update",
    del:"/sys/user/%s/del",
  },
  sysMenu:{
    pageList:"/sys/menu/tree",
    add:"/sys/menu/add",
    edit:"/sys/menu/%s/update",
    del:"/sys/menu/%s/del",
  },
  sysDept:{
    pageList:"/sys/dept/list",
    add:"/sys/dept/add",
    edit:"/sys/dept/%s/update",
    del:"/sys/dept/%s/del",
  },
  sysPermissionDict:{
    pageList:"/sys/permission-dict/list",
    add:"/sys/permission-dict/add",
    edit:"/sys/permission-dict/%s/update",
    del:"/sys/permission-dict/%s/del",
  }
};


export default {
  allUrl
}
