<template>
  <div>
    <el-form :inline="true" class="container-head ">
          <div class="handle-box">
            <el-input v-model="query.menuId" placeholder="菜单Id" class="handle-input mr10"></el-input>
            <el-input v-model="query.menuName" placeholder="菜单名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </div>
    </el-form>

    <div class="container">
      <el-table
          :data="tableData"
          border
          class="table"
          row-key="menuId"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
          :tree-props="{children: 'childMenus', hasChildren: 'hasChildMenus'}"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="菜单名称" width="150">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
            {{scope.row.menuName}}
          </template>
        </el-table-column>
        <el-table-column prop="seq" label="排序" width="100" align="center"></el-table-column>
        <el-table-column prop="url" label="请求url" width="400"></el-table-column>

        <el-table-column prop="menuType" label="类型" align="center">
          <template slot-scope="scope">
            <el-tag :type=" scope.row.menuType == 'M' ? 'success':'danger' ">
              <span v-if = "scope.row.menuType == 'M' " >目录</span>
              <span v-if = "scope.row.menuType == 'C' " >菜单</span>
              <span v-if = "scope.row.menuType == 'B' " >按钮</span>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type=" scope.row.status == '0' ? 'success':'danger' ">
              <span v-if = "scope.row.status == '0' " >正常</span>
              <span  v-else>异常</span>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                type="text"
                class="green"
                icon="el-icon-lx-add"
                @click="handleAdd(scope.$index, scope.row)"
            >新增</el-button>

            <el-button
                type="text"
                icon="el-icon-edit"
                class="blue"
                @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="菜单id" readonly: true>
          <el-input v-model="form.menuId"></el-input>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="form.menuName"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="form.seq"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="form.menuType" placeholder="请选择类型" >
             <el-option v-for='(item, index) in options' :key='index' :label='item.label' :value='item.value'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请求">
          <el-input v-model="form.url" value="#"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
           <el-button @click="closeEdit">取 消</el-button>
           <el-button type="primary" @click="handleEdit(form.menuId)">确 定</el-button>
      </span>
    </el-dialog>



    <!-- 编辑弹出框 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="父菜单" readonly: true>
          <el-input v-model="form.parentId"></el-input>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="form.menuName"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="form.seq"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="form.menuType" placeholder="请选择类型">
             <el-option v-for='(item, index) in options' :key='index' :label='item.label' :value='item.value'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请求">
          <el-input v-model="form.url" value="#"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import BaseList from '@/components/BaseCurd.vue';
  import sysUrl from '@/api/sys/SysUrl';
  export default {
    extends: BaseList,
    data() {
      const data = BaseList.data();
      data.url = sysUrl.allUrl.sysMenu;
      data.options=[
        {
          label:"目录",
          value:"M"
        },
        {
          label:"菜单",
          value:"C"
        },
        {
          label:"按钮",
          value:"B"
        }
      ]
      return data
    },

    methods:{
      handleAfterPageList(result){
        const list =  result.data;
        this.tableData = list.childMenus;
        this.pageTotal = list.total;
      },
    }
  };
</script>

<style scoped>
  .handle-box {

  }
  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 150px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }

  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }

  .red {
    color: #ff3f19;
  }

  .green {
    color: rgba(19, 192, 1, 0.85);
  }

  .origin {
    color: #ffb527;
  }
  .blue{
    color: #2442ff;
  }

</style>
