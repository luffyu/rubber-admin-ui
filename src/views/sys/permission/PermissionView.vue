<template>
  <div >

      <template v-for="(v,k) in permissionList">
          <template v-if = "v.unitKey">
              <div ><span>{{ k }}</span> <span>{{ v.name }}</span> <span>{{ v.linkKey }}</span></div>

            <template v-for="(uv,uk) in v.unitKey">
                <div ><span>{{ uk }}</span> <span>{{ uv.name }}</span> <span>{{ uv.linkKey }}</span></div>
            </template>

          </template>
          <template v-else>
            <div ><span>{{ k }}</span> <span>{{ v.name }}</span> <span>{{ v.linkKey }}</span></div>
          </template>
      </template>

  </div>
</template>


<script>
  import request from '../../../api/sys/permission';
  export default {
    data(){
      return {
        permissionList: {}
      }
    },
    created() {
      this.getData();
    },
    methods: {
        getData(){
          request.queryList().then(result => {
              this.permissionList = result.data;
              console.info(this.permissionList)
          })
        }
    }
  }

</script>
