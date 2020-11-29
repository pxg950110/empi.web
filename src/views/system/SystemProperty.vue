<!--
 @author CH_pxg
 @emil pxg950110@163.com
 @date 2020/11/27
 @version v1.0
 @description
-->
<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <el-button>增加属性</el-button>
<!--                <el-button>筛选</el-button>-->
                <el-button>导出属性EXCEL</el-button>
            </div>
            <el-table :data="matchPropertys" width="100%">
                <el-table-column
                        prop="id"
                        label="id"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="code"
                        label="属性代码"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="属性名称">
                </el-table-column>
                <el-table-column label="操作">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {getAllMatchPropertys} from "../../api/webApi";

    export default {
        name: "SystemProperty",
        data(){
          return{
              matchPropertys:[]
          }
        },
        created(){
          this.getMatchPropertys()
        },
        methods:{
            getMatchPropertys(){
                getAllMatchPropertys().then(res => {
                    if (res.code === 200) {
                        this.matchPropertys = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
