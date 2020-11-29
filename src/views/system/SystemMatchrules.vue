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
                <div class="key-selection-div">
                    <template v-for="item in selectionPropertyList">
                        <el-tag :key="item.code" closable type="success">
                            {{item.value}}
                        </el-tag>
                    </template>
                    <el-button @click="selectionPropertydialogVisible=true" icon="el-icon-plus" circle></el-button>
                    <template v-if="selectionPropertyUpdateFlag">
                        <el-button icon="el-icon-check" circle type="success"></el-button>
                        <el-button icon="el-icon-close" circle type="danger"></el-button>
                    </template>
                </div>
            </el-card>
        </div>
        <div>
            <el-card>
                <div slot="header" class="clearfix">
                    <span>主标识</span>
                </div>
                <div class="key-primary-div">
                    <template v-if="primaryKeyList.length>0">
                        <el-tag :key="primaryKeyList[0].code" @close="closePrimaryKeyButton(primaryKeyList[0])"
                                closable>
                            {{primaryKeyList[0].value}}
                        </el-tag>
                    </template>
                    <template v-else>
                        <el-button @click="primaryKeydialogVisible=true" icon="el-icon-plus" circle></el-button>
                    </template>
                    <template v-if="primaryKeyUpdateFlag">
                        <el-button icon="el-icon-check" @click="submitPrimayKeyUpdateButton"
                                   circle type="success"></el-button>
                        <el-button icon="el-icon-close" circle type="danger"
                                   @click="cancelPrimayKeyUpdateButton"></el-button>
                    </template>
                </div>
            </el-card>
        </div>
        <div>
            <el-card>
                <div slot="header" class="clearfix">
                    <span>副标识</span>
                </div>
                <div class="key-second-div">
                    <el-tag closable>身份证号</el-tag>
                    <el-tag closable>医保卡号</el-tag>
                    <el-button icon="el-icon-plus" circle></el-button>
                </div>
            </el-card>
        </div>
        <el-card>
            <div slot="header" class="clearfix">
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
        <div>
            <!--            纳排属性的选择-->
            <el-dialog
                    title="请选择纳排属性"
                    :visible.sync="selectionPropertydialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
    <el-button @click="selectionPropertydialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="selectionPropertydialogVisible = false">确 定</el-button>
  </span>
            </el-dialog>
            <!--            主标识的选择-->
            <el-dialog
                    title="请选择主标识"
                    :visible.sync="primaryKeydialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <span>这是一段信息</span>
                <el-radio-group v-model="primaryKeyRadio">
                    <template v-for="item in matchPropertys">
                        <el-radio-button :key="item.code" :label="item.name" class="div-el-radio-button">
                        </el-radio-button>
                    </template>
                </el-radio-group>
                <span slot="footer" class="dialog-footer">
    <el-button @click="primaryKeydialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="primaryKeydialogVisible = false">确 定</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        getAllMatchPropertys,
        getAllSelectionProperty,
        getMatchFactorList,
        getPrimaryKeyList
    } from "../../api/webApi";

    export default {
        name: "SystemMatchrules",
        data() {
            return {
                matchFactorList: [],
                primaryKeyList: [],
                primaryKeyUpdateFlag: false,
                primaryKeydialogVisible: false,
                primaryKeyRadio: null,
                selectionPropertyList: [],
                selectionPropertyUpdateFlag: false,
                selectionPropertydialogVisible: false,
                matchPropertys: [],//属性列表
            }
        },
        created() {
            this.getMatchFactorListInfo()
            this.getEmpiPrimaryKeyList()
            this.getEmpiSelectionPropertyList()
        },
        mounted() {
            if (this.matchPropertys.length === 0) {
                this.getMatchPropertys()
            }
        },
        methods: {
            getMatchPropertys() {
                getAllMatchPropertys().then(res => {
                    if (res.code === 200) {
                        this.matchPropertys = res.data
                    }
                })
            },
            getEmpiSelectionPropertyList() {
                getAllSelectionProperty().then(res => {
                    if (res.code === 200) {
                        this.selectionPropertyList = res.data
                    }
                })
            },
            getEmpiPrimaryKeyList() {
                getPrimaryKeyList().then(res => {
                    if (res.code === 200) {
                        this.primaryKeyList = res.data
                    }
                }).catch(e => {
                    console.error(e)
                })
            },
            getMatchFactorListInfo() {
                getMatchFactorList().then(res => {
                    console.log(res)
                    this.matchFactorList = res.data
                }).catch(error => {
                    console.error(error)
                })
            },
            closePrimaryKeyButton(evt) {
                console.log(evt)
                //移除primaryKey
                // eslint-disable-next-line no-unused-vars
                var code = evt.code;
                //
                for (var i = 0; i < this.primaryKeyList.length; i++) {
                    if (this.primaryKeyList[i].code === code) {
                        this.primaryKeyList.splice(i, 1)
                    }
                }
                if (this.primaryKeyList.length === 0) {
                    this.primaryKeyUpdateFlag = true
                }
            },
            /**
             * 取消
             * @param evt
             */
            // eslint-disable-next-line no-unused-vars
            cancelPrimayKeyUpdateButton(evt) {
                this.$confirm('此操作将放弃修改,是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getEmpiPrimaryKeyList()
                    this.primaryKeyUpdateFlag = false
                    this.$message({
                        type: 'success',
                        message: '取消修改主标识成功'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            /**
             * 提交主标识的属性
             */
            submitPrimayKeyUpdateButton() {
                if (this.primaryKeyList.length === 0) {
                    this.$message.warning("请至少添加一个主标识的属性")
                } else {
                    console.log("更新属性")
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                    });
            }
        }
    }
</script>

<style scoped>
    .key-selection-div .el-tag {
        margin-right: 20px;
    }

    .key-selection-div .el-button {
        margin-right: 20px;
    }

    .key-primary-div .el-tag {
        margin-right: 20px;
    }

    .key-primary-div .el-button {
        margin-right: 20px;
    }

    .key-second-div .el-tag {
        margin-right: 20px;
    }

    .key-second-div .el-button {
        margin-right: 20px;
    }
    .div-el-radio-button{
        border: 1px solid #dfffbc;
        margin-left: 20px;
        margin-top: 20px;
    }
</style>
