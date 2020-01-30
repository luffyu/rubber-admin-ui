<script>
  import request from '@/utils/request';
  import global from '@/utils/Global';
  export default {

    /**
     * ***************************************数据体***************************************************************
     * 分页查询方法
     */
    data() {
      return {
        //查询的字段信息
        query:{
          page:1,
          size:10,
          selectModels:[]
        },
        //表格的基本信息
        tableData: [],
        //编辑model是否显示
        editVisible: false,
        //新增model是否显示
        addVisible: false,
        //分页总数
        pageTotal: 0,
        url:{
          pageList:"",
          add:"",
          del:"",
          edit:"",
        },
        //表单提交的数据信息
        form:{},
        //当前行数
        rowIndex: -1,

        multipleSelection: [],
        delList: [],
        id: -1,
      };
    },

    //记载页面的时候 会调用的方法
    created() {
      this.getPageList();
    },

    // 方法结合
    methods: {


      /**
       * ***************************************列表查询***************************************************************
       * 分页查询方法
       */
      getPageList() {
        request({
          url: global.rubberBasePath + this.url.pageList,
          method: 'get',
          params: {
            'json':encodeURI(JSON.stringify(this.query))
          }
        }).then(result => {
          console.info(result);
          if (global.SUCCESS === result.code){
            this.handleAfterPageList(result);
          }else {
            this.$message.error(result.msg);
          }
        })
      },
      handleAfterPageList(result){
        const list =  result.data;
        this.tableData = list.records;
        this.pageTotal = list.total;
      },

      /**
       * 搜索按钮查询
       */
      handleSearch() {
        this.$set(this.query, 'page', 1);
        this.getPageList();
      },

      /**
       * 分页导航 查询
       * @param val
       */
      handlePageSearch(val) {
        this.$set(this.query, 'page', val);
        this.getPageList();
      },

      /**
       *  * ***************************************编辑操作***************************************************************
       * 打开编辑操作框
       * @param index 当前行数id
       * @param row 当前行数的数据
       */
      openEdit(index, row) {
        this.rowIndex = index;
        this.form = row;
        this.editVisible = true;
      },

      /**
       * 关闭编辑操作框
       */
      closeEdit() {
        this.editVisible = false;
        this.form = {};
        this.rowIndex = -1;
      },
      /**
       * 保存编辑的数据方法
       */
      handleEdit(id) {
        const editUrl = this.url.edit.replace("%s",id);
        request({
          url: global.rubberBasePath + editUrl,
          method: 'post',
          data: this.preHandleEdit(this.form)
        }).then(result => {
          if(result.code === global.SUCCESS){
            this.editVisible = false;
            this.$message.success(`修改第 ${this.rowIndex + 1} 行成功`);
            this.form={};
            this.getPageList();
          }else {
            this.$message.error(result.msg);
          }
        })
      },
      /**
       * 修改之前的操作
       */
      preHandleEdit(form){
        return form;
      },





      /**
       * ***************************************新增操作***************************************************************
       * 打开新增框
       */
      openAdd() {
        this.addVisible = true;
      },

      /**
       * 关闭新增框
       */
      closeAdd() {
        this.addVisible = false;
        this.form = {};
      },

      /**
       * 保存添加的方法
       */
      handleAdd() {
        request({
          url: global.rubberBasePath + this.url.add,
          method: 'post',
          data: this.preHandleAdd(this.form)
        }).then(result => {
          if(result.code === global.SUCCESS){
            this.addVisible = false;
            this.$message.success(`新增数据成功`);
            this.form={};
            this.getPageList();
          }else {
            this.$message.error(result.msg);
          }
        })
      },
      /**
       * 添加之前的操作
       */
      preHandleAdd(form){
        return form;
      },



      /**
       * ***************************************删除操作***************************************************************
       * 删除操作
       */
      handleDelete(id, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        }).then(() => {
          const delUrl = this.url.del.replace("%s", id);
          request({
            url: global.rubberBasePath + delUrl,
            method: 'post',
          }).then(result =>{
            if(result.code === global.SUCCESS){
              this.$message.success(`删除成功`);
              this.getPageList();
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


      normalShowStatus(status){
        if (status === 0){
          return '正常';
        }else if(status < 0){
          return "停用";
        }else {
          return "-"
        }
      }
    },

    render(){

    }

  };
</script>
