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
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
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

/**
 * 定义的参数数据值
 * @type {{items: [], collapse: boolean}}
 */
let menuData =  {
    //测边栏是否展开
    collapse: false,
    //菜单信息
    items: [{
        icon:'el-icon-lx-home',
        title:'我的主页',
        index: 'dashboard',
    }]
};

export default {
    data() {
       return menuData;
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
                const menuInfo = result.data.sysMenu;
                const childMenus = menuInfo.childMenus;
                if(childMenus != undefined && childMenus.length > 0){
                    for(const i in childMenus){
                        this.showMenus(menuData.items,childMenus[i]);
                    }
                }
            }else {
                this.$message.error(result.msg);
            }
        });
    },

    methods:{
        /**
         * 展示字目录
         * @param items 根菜单信息
         * @param menuInfo 当前的用户信息
         * @returns {{}}
         */
        showMenus:function(items,menuInfo) {
            const item = {};
            item.icon = 'el-icon-lx-global';
            item.title = menuInfo.menuName;
            if(menuInfo.menuType === 'M'){
                let subs = [];
                const childMenus = menuInfo.childMenus;
                for(const i in childMenus){
                    this.showMenus(subs,childMenus[i]);
                }
                item.subs = subs;
            }else {
                item.index = menuInfo.url;
            }
            items.push(item);
            return item;
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
