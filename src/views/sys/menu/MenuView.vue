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
                icon="el-icon-edit"
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
        <el-form-item label="用户名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
           <el-button @click="editVisible = false">取 消</el-button>
           <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchData } from '@/api/index';
  import userRequest from '../../../api/sys/menu';
  import global from '../../../utils/Global';
  export default {
    name: 'basetable',
    data() {
      return {
        query:{

        },
        tableData: [],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        pageTotal: 0,
        form: {},
        idx: -1,
        id: -1
      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        //获取后台接口数据
        userRequest.queryTree().then(result => {
          console.info(result);
            if (global.SUCCESS === result.code){
              const list =  result.data;
              this.tableData = list.childMenus;
              console.info(this.tableData);
              this.pageTotal = list.total;

            }else {
              this.$message.error(result.msg);
            }
        })
      },
      // 触发搜索按钮
      handleSearch() {
        this.getData();
      },

      // 删除操作
      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
            .then(() => {
              this.$message.success('删除成功');
              this.tableData.splice(index, 1);
            })
            .catch(() => {});
      },

      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      delAllSelection() {
        const length = this.multipleSelection.length;
        let str = '';
        this.delList = this.delList.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
          str += this.multipleSelection[i].name + ' ';
        }
        this.$message.error(`删除了${str}`);
        this.multipleSelection = [];
      },
      // 编辑操作
      handleEdit(index, row) {
        this.idx = index;
        this.form = row;
        this.editVisible = true;
      },
      // 保存编辑
      saveEdit() {
        this.editVisible = false;
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        this.$set(this.tableData, this.idx, this.form);
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'page', val);
        this.getData();
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
    width: 150px;
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
