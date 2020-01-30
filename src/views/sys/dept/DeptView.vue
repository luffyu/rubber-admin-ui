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
      <div class="container-head ">
        <el-button
            type="button"
            icon="el-icon-lx-add"
            class="el-button-add"
            @click="openAdd"
        >新增</el-button>

        <el-button
            type="button"
            icon="el-icon-lx-edit"
            class="el-button-edit"
            @click="openAdd"
        >修改</el-button>

        <el-button
            type="button"
            icon="el-icon-lx-delete"
            class="el-button-delete"
            @click="openAdd"
        >删除</el-button>

        <el-button
            type="button"
            icon="el-icon-lx-exchange"
            class="el-button-fold"
            @click="collapseAll()"
        >展开/折叠</el-button>
      </div>

      <el-table
          :data="tableData"
          border
          class="table"
          row-key="deptId"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="deptName" label="部门名称"></el-table-column>
        <el-table-column prop="leader" label="负责人"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮件"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type=" scope.row.status == '0' ? 'success':'danger' ">
              <span >{{ normalShowStatus(scope.row.status) }}</span>
            </el-tag>
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
        <el-form-item label="部门id">
          <el-input v-model="form.deptId"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="closeEdit">取 消</el-button>
                <el-button type="primary" @click="saveEdit(form.deptId)">确 定</el-button>
            </span>
    </el-dialog>


    <!-- 添加或修改部门对话框 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="40%">
      <el-form ref="form" :model="form"  label-width="80px">
          <el-form-item label="上级部门" prop="parentId">

          </el-form-item>

          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="form.deptName" placeholder="请输入部门名称" />
          </el-form-item>

          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
          </el-form-item>

          <el-form-item label="负责人" prop="leader">
            <el-input v-model="form.leader" placeholder="请输入负责人" maxlength="20" />
          </el-form-item>

          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话" maxlength="11" />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
          </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" >确 定</el-button>
        <el-button >取 消</el-button>
      </div>
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
      data.url = sysUrl.allUrl.sysDept;
      return data
    },
    methods: {
      handleAfterPageList(result) {
        this.tableData = result.data;
      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if(this.multipleSelection >= 1){
          this.$refs.multipleTable.clearSelection();
          this.$refs.multipleTable.toggleRowSelection(val.pop());
        }else {
          this.multipleSelection = val.pop();
        }
      },
      handleRowClick(row,column,event){
        this.$refs.multipleTable.toggleRowSelection(row)
      }
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
