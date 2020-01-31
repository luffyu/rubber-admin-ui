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
            @click="openEditByRadio"
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
          row-key="menuId"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @select="select"
          @row-click="rowClick"
          @selection-change="radioSelectionChange"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
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
                class="blue"
                @click="openEdit(scope.$index, scope.row)"
            >编辑</el-button>

            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.row.menuId, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!-- 编辑弹出框 -->
    <el-dialog :title="addEditTitle"  :visible.sync="addEditVisible" :before-close='closeAddEdit' width="40%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="父菜单" prop="parentId">
          <treeselect v-model="form.parentId" :multiple="false" :options="tableData" :normalizer="normalizer" />
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="form.menuName"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="form.menuType" placeholder="请选择类型">
             <el-option v-for='(item, index) in options' :key='index' :label='item.label' :value='item.value'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请求">
          <el-input v-model="form.url" value="#"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number v-model="form.seq" controls-position="right" :min="0" />
        </el-form-item>

        <el-form-item label="菜单图标">
          <el-input v-model="form.icon"  />
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddEdit">取 消</el-button>
        <el-button type="primary" @click="handleAddEdit(form.menuId)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import BaseList from '@/components/BaseTableCurd.vue';
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
      ];
      data.statusOptions = [
        {
          dictValue:0,
          dictLabel:'正常'
        },
        {
          dictValue:-1,
          dictLabel:'异常'
        }
      ]
      return data
    },

    methods:{
      handleAfterPageList(result){
        const list =  result.data;
        this.tableData = list.children;
        this.pageTotal = list.total;
      },

      normalizer(node) {
        return {
          id: node.menuId,
          label: node.menuName,
          children: node.children,
        }
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
