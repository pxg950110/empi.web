import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "../views/home/Home";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "首页",
        redirect: "index",
        meta: {showMenu: true}
    }, {
        path: "/index",
        name: "首页",
        component: () => import("../views/home/Home"),
        meta: {showMenu: true}
    }, {
        path: "/patient/query",
        name: "患者查询",
        component: () => import("../views/patient/PatientQuery.vue"),
        meta: {showMenu: true}
    }
    , {
        path: "/patient/merge",
        name: "患者合并",
        component: () => import("../views/patient/PatientMerge.vue"),
        meta: {showMenu: true}
    }, {
        path: "/patient/split",
        name: "患者拆分",
        component: () => import("../views/patient/PatientSplit.vue"),
        meta: {showMenu: true}
    }, {
        path: "/patient/suspected",
        name: "疑似队列",
        component: () => import("../views/patient/PatientSuspected.vue"),
        meta: {showMenu: true}
    }, {
        path: "/log/merge",
        name: "合并记录",
        component: () => import("../views/log/LogMerge.vue"),
        meta: {showMenu: true}
    }, {
        path: "/log/match",
        name: "匹配日志",
        component: () => import("../views/log/LogMatch.vue"),
        meta: {showMenu: true}
    }, {
        path: "/log/system",
        name: "系统日志",
        component: () => import("../views/log/LogSystem.vue"),
        meta: {showMenu: true}
    }, {
        path: "/system/property",
        name: "属性配置",
        component: () => import("../views/system/SystemProperty.vue"),
        meta: {showMenu: true}
    }, {
        path: "/system/matchrules",
        name: "匹配规则",
        component: () => import("../views/system/SystemMatchrules.vue"),
        meta: {showMenu: true}
    }, {
        path: "/system/setting",
        name: "系统配置",
        component: () => import("../views/system/SystemSetting.vue"),
        meta: {showMenu: true}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
