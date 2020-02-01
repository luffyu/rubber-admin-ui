<template>


  <div class="container">


    <el-table
        :data="tableData"
        border
        class="table"
        row-key="key"
        ref="multipleTable"
        highlight-current-row
        header-cell-class-name="table-header"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="selection" ref="selectKey" width="55" align="center"></el-table-column>

      <el-table-column prop="key" label="权限key"  ></el-table-column>
      <el-table-column prop="name" label="权限名称" ></el-table-column>
      <el-table-column prop="linkKey" label="关联的值" ></el-table-column>
    </el-table>

  </div>

</template>


<script>
  import BaseList from '@/components/BaseTableCurd.vue';
  import sysUrl from '@/api/sys/SysUrl';

  export default {
    extends: BaseList,
    data() {
      const data = BaseList.data();
      data.url = sysUrl.allUrl.sysPermission;
      return data
    },

    methods:{
      handleAfterPageList(result){
        this.tableData = result.data;
      },

    }
  };

</script>
