<template>


  <div class="container">


    <el-table
        :data="tableData"
        border
        class="table"
        row-key="groupKey"
        ref="multipleTable"
        highlight-current-row
        header-cell-class-name="table-header"
        :tree-props="{children: 'mappingModels', hasChildren: 'hasChildren'}"
    >

      <el-table-column prop="groupKey" label="权限key"  ></el-table-column>
      <el-table-column prop="groupName" label="权限名称" ></el-table-column>
      <el-table-column prop="members" label="关联的值" >
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.members">
            <span v-if="index != 0">,</span>
            {{item}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="urls" label="相关请求" >

        <template slot-scope="scope" >
            <el-dropdown>
              <span class="el-dropdown-link" >查看url</span>
              <el-dropdown-menu slot="dropdown">
                <div v-for="(item,index) in scope.row.urls">
                  <el-dropdown-item> {{item}}</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
        </template>

      </el-table-column>
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
      data.url = sysUrl.allUrl.sysAuthorize;
      return data
    },

    methods:{
      handleAfterPageList(result){
        this.tableData = result.data;
      }
    }
  };

</script>


<style>
  .el-dropdown-link {
    cursor: pointer;
    color: rgba(76, 76, 76, 0.8);
    font-size: 10px;
  }
</style>

