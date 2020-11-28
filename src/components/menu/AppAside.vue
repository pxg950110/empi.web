<!--
 @author CH_pxg
 @emil pxg950110@163.com
 @date 2020/11/26
 @version v1.0
 @description
-->
<template>
    <el-menu default-active="0"
             class="el-menu-vertical-demo"
             background-color="#11101d"
             text-color="#fff"
             active-text-color="#ffd04b"
             router >
        <template v-for="(item,index) in menuList">
            <template  v-if="item.children.length>1">
                <el-submenu :index="index" :key="item.router">
                    <template slot="title">
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="child in item.children"
                                  :index="child.router" :key="child.router">
                        <span slot="title">{{child.name}}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.router" :key="item.router">
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </template>

        </template>
    </el-menu>
</template>

<script>
    import {menuList} from "../../config/menuconfig";

    export default {
        name: "AppAside",
        computed: {
            menuList() {
                return menuList;
            }
        }
    }
</script>

<style scoped>

</style>
