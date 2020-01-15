<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in sysMenu">
                <template v-if="item.childMenus && item.childMenus.length > 0 ">
                    <el-submenu :index="item.url" :key="item.seq">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.menuName }}</span>
                        </template>
                        <template v-for="subItem in item.childMenus">
                            <el-submenu
                                v-if="subItem.childMenus && subItem.childMenus.length > 0"
                                :index="subItem.url"
                                :key="subItem.seq"
                            >
                                <template slot="title">{{ subItem.menuName }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.childMenus"
                                    :key="i"
                                    :index="threeItem.url"
                                >{{ threeItem.menuName }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.url"
                                :key="subItem.seq"
                            >{{ subItem.menuName }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.seq">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.menuName }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../../api/home/bus';
import { getUserInfoAndMenus } from '@/api/home/home';
import global from '@/utils/Global';
import {setUserInfo} from '@/utils/auth';

let index = 0;
export default {
    data() {
       return {
           //测边栏是否展开
           collapse: true,
           //菜单信息
           sysMenu: [{
               icon:'el-icon-lx-home',
               menuName:'我的主页',
               url: 'welcome',
           }],
       };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },

    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });

        // 获取用户的菜单信息
        getUserInfoAndMenus().then(result => {
            if(result.code === global.SUCCESS){
                //设置用户的基本信息到cookie中
                const userInfo = result.data.sysUser;
                setUserInfo(userInfo);
                //获取用户的菜单信息
                const menuInfo = result.data.sysMenus;
                //获取根目录的菜单信息
                if(menuInfo && menuInfo.length > 0){
                    menuInfo.forEach((item) => {
                        this.sysMenu.push(item);
                    });
                }
            }else {
                this.$message.error(result.msg);
            }
        });
    },

};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}
</style>
