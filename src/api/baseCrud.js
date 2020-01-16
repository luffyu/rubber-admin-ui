const methodRequest = function() {
};

export default {
  data() {
    return {
      query:{
      },

      form:{
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      addVisible:false,
      pageTotal: 0,
      idx: -1,
      id: -1,
    };
  },


  methods: {
    getData() {
      methodRequest.queryTree().then(result => {
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
      }).then(() => {
        methodRequest.del(row.menuId).then(result =>{
          if(result.code === global.SUCCESS){
            this.$message.success(`删除成功`);
            this.getData();
          }else {
            this.$message.error(result.msg);
          }
        })
      }).catch(() => {});
    },

    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 新增操作操作
    handleAdd(index, row) {
      this.idx = index;
      this.form.parentId = row.menuId;
      this.addVisible = true;
    },

    // 保存编辑
    saveAdd() {
      methodRequest.add(this.form).then(result => {
        if(result.code === global.SUCCESS){
          this.addVisible = false;
          this.$message.success(`添加成功`);
          this.form={};
          this.getData();
        }else {
          this.$message.error(result.msg);
        }
      })
    },

    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      methodRequest.edit(this.form.menuId,this.form).then(result => {
        if(result.code === global.SUCCESS){
          this.editVisible = false;
          this.$message.success(`修改第 ${this.idx + 1} 行成功`);
          this.$set(this.tableData, this.idx, this.form);
          this.form={}
        }else {
          this.$message.error(result.msg);
        }
      })
    },

    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'page', val);
      this.getData();
    }
  }
}
