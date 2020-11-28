<!--
 @author CH_pxg
 @emil pxg950110@163.com
 @date 2020/11/27
 @version v1.0
 @description
-->
<template>
    <el-container id="components-layout-demo-custom-trigger">
        <el-aside :trigger="null" collapsible>
            <app-card></app-card>
            <AppAside></AppAside>
        </el-aside>
        <el-container>
<!--            <el-header style="background: #fff; padding: 0;border: 1px wheat solid;">-->
<!--                &lt;!&ndash;                <a-icon&ndash;&gt;-->
<!--                &lt;!&ndash;                        class="trigger"&ndash;&gt;-->
<!--                &lt;!&ndash;                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"&ndash;&gt;-->
<!--                &lt;!&ndash;                        @click="() => (collapsed = !collapsed)"&ndash;&gt;-->
<!--                &lt;!&ndash;                />&ndash;&gt;-->
<!--            </el-header>-->
            <el-main
                    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
            >
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import AppAside from "./AppAside";
    import AppCard from "./AppCard";

    export default {
        name: "AppMain",
        data() {
            return {
                collapsed: false
            };
        },
        components: {AppCard, AppAside}
    }
</script>

<style scoped>
    html, body {
        height: 100%;
        width: 100%;
    }

    .el-container {
        height: 100%;
        width: 100%;
    }

    .el-container .el-header {
        background-color: #3748ff;
        height: 10%;
        min-height: 100px;
        color: white;
        font-size: 24px;
    }

    .el-container .el-aside {
        min-height: 90%;
        background-color: #11101d;
        width: 16%;
    }
</style>
