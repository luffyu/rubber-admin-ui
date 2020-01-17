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
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="userId" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="loginAccount" label="登陆账户" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template slot-scope="scope">
            <el-image
                class="table-td-thumb"
                :src="scope.row.thumb"
                :preview-src-list="[scope.row.avatar]"
            ></el-image>
          </template>
        </el-table-column>


        <el-table-column prop="loginIp" label="登陆IP" align="center"></el-table-column>
        <el-table-column prop="loginCount" label="登陆次数" align="center"></el-table-column>
        <el-table-column prop="loginTime" label="登陆时间" align="center"></el-table-column>

        <el-table-column prop="createBy" label="创建人" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="updateBy" label="创建人" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="创建时间" align="center"></el-table-column>

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
                icon="el-icon-lx-add"
                @click="openAdd"
            >添加</el-button>

            <el-button
                type="text"
                icon="el-icon-edit"
                @click="openEdit(scope.$index, scope.row)"
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
        <el-form-item label="用户id">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model="form.loginAccount"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.loginPwd"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.avatar"></el-input>
        </el-form-item>

        <el-form-item label="部门">
          <el-input v-model="form.deptId"></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-input v-model="form.roleId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="closeEdit">取 消</el-button>
                <el-button type="primary" @click="handleEdit(form.userId)">确 定</el-button>
            </span>
    </el-dialog>



    <!-- 编辑弹出框 -->
    <el-dialog title="添加" :visible.sync="addVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="账户">
          <el-input v-model="form.loginAccount"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.loginPwd"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.avatar"></el-input>
        </el-form-item>

        <el-form-item label="部门">
          <el-input v-model="form.deptId"></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-input v-model="form.roleId"></el-input>
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
  import request from '@/utils/request';
  import global from '@/utils/Global';

  export default {
    extends: BaseList,
    data() {
      const data = BaseList.data();
      data.url = sysUrl.allUrl.sysUser;
      return data
    },

    /**
     * 保存添加的数据信息
     */
    methods: {

      handleEdit(id) {
        const editUrl = this.url.edit.replace("%s", id);
        request({
          url: global.rubberBasePath + editUrl,
          method: 'post',
          data: {
            sysUser: this.form
          }
        }).then(result => {
          if (result.code === global.SUCCESS) {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.rowIndex + 1} 行成功`);
            this.form = {};
            this.getPageList();
          } else {
            this.$message.error(result.msg);
          }
        })
      }
    }
  };
</script>

<style scoped>

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
  .red {
    color: #ff0000;
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
