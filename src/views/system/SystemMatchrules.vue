<!--
 @author CH_pxg
 @emil pxg950110@163.com
 @date 2020/11/27
 @version v1.0
 @description
-->
<template>
    <div>
        <div>
            <el-card>
                <div slot="header" class="clearfix">
                    <span>纳排标准</span>
                </div>
                <el-tag closable>姓名</el-tag>
                <el-tag closable type="success">性别</el-tag>
                <el-button icon="el-icon-plus" circle></el-button>
            </el-card>
        </div>
        <div>
            <el-card>
                <div slot="header" class="clearfix">
                    <span>主标识</span>
                </div>
                <el-tag closable>患者ID</el-tag>
                <el-button icon="el-icon-plus" circle></el-button>
            </el-card>
        </div>
        <div>
            <el-card>
                <div slot="header" class="clearfix">
                    <span>副标识</span>
                </div>
                <el-tag closable>身份证号</el-tag>
                <el-tag closable>医保卡号</el-tag>
                <el-button icon="el-icon-plus" circle></el-button>
            </el-card>
        </div>
        <el-card>
            <div  slot="header" class="clearfix">
                <el-button>增加匹配规则</el-button>
                <el-button>导出JSON样例</el-button>
                <el-button>导出规则EXCEL</el-button>
            </div>

            <el-table
                    :data="matchFactorList"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="id"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="propertyCode"
                        label="属性代码"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="propertyName"
                        label="属性名称">
                </el-table-column>
                <el-table-column
                        prop="positiveGrede"
                        label="加分值">
                </el-table-column>
                <el-table-column
                        prop="negativeGrade"
                        label="减分值">
                </el-table-column>
                <el-table-column label="操作">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {getMatchFactorList} from "../../api/webApi";

    export default {
        name: "SystemMatchrules",
        data() {
            return {
                matchFactorList: [],
            }
        },
        created() {
            this.getMatchFactorListInfo()
        },
        methods: {
            getMatchFactorListInfo() {
                getMatchFactorList().then(res => {
                    console.log(res)
                    this.matchFactorList = res.data
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>
