/**
 * @author CH_pxg
 * @emil pxg950110@163.com
 * @date 2020/11/26
 * @version v1.0
 * @description
 */
export const menuList = [
    {
        name: "首页",
        key: "1",
        router: "/",
        show: true,
        icon: "index",
        component: "",
        children: []

    },
    {
        name: "患者管理",
        key: "2",
        router: "/patient",
        show: true,
        icon: "index",
        component: "",
        children: [{
            name: "患者查询",
            key: "2-1",
            router: "/patient/query",
            show: true,
            icon: "index",
            component: "",
            children: []
        }, {
            name: "患者合并",
            key: "2-2",
            router: "/patient/merge",
            show: true,
            icon: "index",
            component: "",
            children: []
        }, {
            name: "患者拆分",
            key: "2-3",
            router: "/patient/split",
            show: true,
            icon: "index",
            component: "",
            children: []
        }, {
            name: "疑似队列",
            key: "2-4",
            router: "/patient/suspected",
            show: true,
            icon: "index",
            component: "",
            children: []
        }
        ]
    }, {
        name: "日志查询",
        key: "3",
        router: "/log",
        show: false,
        icon: "index",
        component: "",
        children: [
            {
                name: "合并记录",
                key: "3",
                router: "/log/merge",
                show: false,
                icon: "index",
                component: "",
                children: []
            },  {
                name: "匹配日志",
                key: "3",
                router: "/log/match",
                show: false,
                icon: "index",
                component: "",
                children: []
            },
            {
                name: "系统日志",
                key: "3",
                router: "/log/system",
                show: false,
                icon: "index",
                component: "",
                children: []
            },
        ]
    }, {
        name: "系统设置",
        key: "4",
        router: "/system",
        show: true,
        icon: "index",
        component: "",
        children: [
            {
                name: "属性配置",
                key: "4-1",
                router: "/system/property",
                show: true,
                icon: "index",
                component: "",
                children: []
            }, {
                name: "匹配规则",
                key: "4-2",
                router: "/system/matchrules",
                show: true,
                icon: "index",
                component: "",
                children: []
            }, {
                name: "系统配置",
                key: "4-3",
                router: "/system/setting",
                show: true,
                icon: "index",
                component: "",
                children: []
            }
        ]
    }
]
