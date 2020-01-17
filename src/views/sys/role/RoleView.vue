<template>
  <div>
    <el-form :inline="true" class="container-head ">
      <div class="handle-box">
        <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
    </el-form>

    <div class="container">
      <template class="container-head ">
        <el-button
            type="button"
            icon="el-icon-lx-add"
            @click="openAdd"
        >新增</el-button>
      </template>

      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="roleId" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column prop="roleKey" label="角色Key值"></el-table-column>
        <el-table-column prop="seq" label="排序"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150" ></el-table-column>
        <el-table-column prop="updateBy" label="创建人"  ></el-table-column>
        <el-table-column prop="updateTime" label="创建时间" width="150"></el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
                :type=" scope.row.state ==='0' ? 'success':'danger' "
            >{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="openEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                class="button-text-red"
                @click="handleDelete(scope.row.roleId, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.page"
            :page-size="query.size"
            :total="pageTotal"
            @current-change="handlePageSearch"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="角色Id">
          <el-input v-model="form.roleId"></el-input>
        </el-form-item>
        <el-form-item label="角色Key">
          <el-input v-model="form.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.seq"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="权限">

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="closeEdit">取 消</el-button>
                <el-button type="primary" @click="handleEdit(form.roleId)">确 定</el-button>
            </span>
    </el-dialog>


    <!-- 编辑弹出框 -->
    <el-dialog title="添加" :visible.sync="addVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="角色Key">
          <el-input v-model="form.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.seq"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="权限">

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
      data.url = sysUrl.allUrl.sysRole;
      return data
    },
  };
</script>





<style scoped>
  .handle-box {

  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
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
</style>
