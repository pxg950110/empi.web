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
                        <el-tag :key="item.code" @close="closeSelectionPropertyButton(item)" closable type="success">
                            {{item.value}}
                        </el-tag>
                    </template>
                    <el-button @click="selectionPropertydialogVisible=true" icon="el-icon-plus" circle></el-button>
                    <template v-if="selectionPropertyUpdateFlag">
                        <el-button icon="el-icon-check"
                                   @click="submitSelectionKeyOperation"
                                   circle type="success"></el-button>
                        <el-button icon="el-icon-close" @click="cancelSelectionPropertyUpdate" circle
                                   type="danger"></el-button>
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
                    :before-close="cancleSelectPropertyDialog">
                <el-checkbox-group v-model="selectionPropertyChooseList">
                    <el-checkbox-button v-for="item in matchPropertys"
                                        class="div-el-checkbox-button"
                                        :label="item.code" :key="item.code">{{item.name}}
                    </el-checkbox-button>
                </el-checkbox-group>
                <span slot="footer" class="dialog-footer">
    <el-button @click="cancleSelectPropertyDialog">取 消</el-button>
    <el-button type="primary" @click="submitSelectPropertyDialog">确 定</el-button>
  </span>
            </el-dialog>
            <!--            主标识的选择-->
            <el-dialog
                    title="请选择主标识"
                    :visible.sync="primaryKeydialogVisible"
                    width="30%"
                    :before-close="cancelUpdatePrimaryKey">
                <el-radio-group v-model="primaryKeyRadio">
                    <template v-for="item in matchPropertys">
                        <el-radio-button :key="item.code" :label="item.code" class="div-el-radio-button">
                            {{item.name}}
                        </el-radio-button>
                    </template>
                </el-radio-group>
                <span slot="footer" class="dialog-footer">
    <el-button @click="cancelUpdatePrimaryKey">取 消</el-button>
    <el-button type="primary" @click="submitUpdatePrimarykey">确 定</el-button>
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
        getPrimaryKeyList, operationPrimaryKey, settingSelectionKeyOperation
    } from "../../api/webApi";

    export default {
        name: "SystemMatchrules",
        data() {
            return {
                selectionPropertyList: [],
                selectionPropertyUpdateFlag: false,
                selectionPropertydialogVisible: false,
                selectionPropertyChooseList: [],//纳排属性修改的集合
                matchFactorList: [],
                primaryKeyList: [],
                primaryKeyUpdateFlag: false,
                primaryKeydialogVisible: false,
                primaryKeyRadio: null,
                primaryKeyConfirmData: {},
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
            //***************************纳排标准开始****************************************
            getEmpiSelectionPropertyList() {
                getAllSelectionProperty().then(res => {
                    if (res.code === 200) {
                        this.selectionPropertyList = res.data
                    }
                })
            },
            /**
             * 关闭纳排标准的el-tag
             */
            closeSelectionPropertyButton(evt) {
                console.log(evt)
                var code = evt.code;
                //
                for (var i = 0; i < this.selectionPropertyList.length; i++) {
                    if (this.selectionPropertyList[i].code === code) {
                        this.selectionPropertyList.splice(i, 1)
                        this.selectionPropertyUpdateFlag = true
                    }
                }
            },
            /**取消和关闭弹出框的事件*/

            cancleSelectPropertyDialog() {
                this.$confirm('确认关闭，放弃纳排属性的修改？')
                    .then(() => {
                        //单选值为空
                        this.selectionPropertyChooseList.splice(0)
                        //关闭弹出窗口
                        this.selectionPropertydialogVisible = false
                    })
                    .catch(() => {
                    });
            },
            /**确认弹出框的事件*/
            submitSelectPropertyDialog() {
                if (this.selectionPropertyChooseList.length === 0) {
                    this.$message.warning("请至少添加一个筛选的属性后再确认")
                } else {
                    //筛选的属性
                    //
                    var selectionValue = [];
                    this.selectionPropertyChooseList.forEach(
                        element => {
                            selectionValue.push("  [" + this.findItemFormMatchPropertys(element).name + "]  ");
                        }
                    )
                    this.$confirm("确定添加筛选的属性:" + selectionValue.join("   ")).then(() => {
                        //确定添加
                        //更新数据 selectionPropertyList
                        for (let i = 0; i < this.selectionPropertyChooseList.length; i++) {
                            var code = this.selectionPropertyChooseList[i]
                            var value = this.findItemFormMatchPropertys(this.selectionPropertyChooseList[i]).name
                            //判断code是否已经存在selectionPropertyList
                            // eslint-disable-next-line no-unused-vars
                            var hasItem = false
                            for (let j = 0; j < this.selectionPropertyList.length; j++) {
                                if (this.selectionPropertyList[j].code === code) {
                                    hasItem = true
                                }
                            }
                            if (hasItem) {
                                console.log(value + "已存在")
                                this.$message.info(value + "属性已存在,已忽略")
                            } else {
                                this.selectionPropertyList.push({'code': code, 'value': value})
                                //更新标志
                                this.selectionPropertyUpdateFlag = true
                            }
                        }
                        //关闭弹出窗
                        this.selectionPropertydialogVisible = false
                        console.log(this.selectionPropertyList)
                        //清空已选择的数据
                        this.selectionPropertyChooseList.splice(0)
                    }).catch(() => {
                        this.$message.info("用户取消操作")
                    });
                }
            },
            /**取消修改纳排属性*/
            cancelSelectionPropertyUpdate() {
                this.$confirm('此操作将放弃修改,是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getEmpiSelectionPropertyList()
                    this.selectionPropertyUpdateFlag = false
                    this.$message({
                        type: 'success',
                        message: '取消修改纳排属性成功'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },

            /**提交按钮更新筛选属性的操作*/
            submitSelectionKeyOperation(){
                if (this.selectionPropertyList.length === 0) {
                    this.$message.warning("请至少添加一个纳排的属性")
                }else{
                    this.$confirm("确定更新纳排的属性？").then(() => {
                        //提交数据
                        var paramData = []
                        for (let i = 0; i <this.selectionPropertyList.length ; i++) {
                            var matchProperty = {}
                            //生成matchProperty
                            matchProperty.code = this.selectionPropertyList[i].code
                            matchProperty.name = this.selectionPropertyList[i].value
                            paramData.push(matchProperty)
                        }
                        //更新数据
                        console.log(paramData)
                        settingSelectionKeyOperation(paramData).then(res => {
                            if (res.code === 200) {
                                this.$message.success(res.data)
                                this.selectionPropertyUpdateFlag = false
                                this.getEmpiSelectionPropertyList()
                            } else {
                                this.$message.success(res.data)
                            }
                        }).catch(e => {
                            console.error(e)
                        })
                        //
                    }).catch(() => {
                    });
                }

            },
            //***************************纳排标准结束****************************************


            //**********************主标识操作函数 开始**********************************
            //获取主标识列表
            getEmpiPrimaryKeyList() {
                getPrimaryKeyList().then(res => {
                    if (res.code === 200) {
                        this.primaryKeyList = res.data
                    }
                }).catch(e => {
                    console.error(e)
                })
            },
            //移除el-tag的事件
            //primarykey
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
             * 放弃修改主标识
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
                    //更新主标识
                    //
                    this.$confirm("确定更新主标识？").then(() => {
                        //提交数据
                        var paramData = []
                        var matchProperty = {}
                        //生成matchProperty
                        matchProperty.code = this.primaryKeyList[0].code
                        matchProperty.name = this.primaryKeyList[0].value
                        paramData.push(matchProperty)
                        //更新数据
                        console.log(paramData)
                        operationPrimaryKey(paramData).then(res => {
                            if (res.code === 200) {
                                this.$message.success(res.data)
                                this.primaryKeyUpdateFlag = false
                                this.getMatchPropertys()
                            } else {
                                this.$message.success(res.data)
                            }
                        }).catch(e => {
                            console.error(e)
                        })
                        //

                    }).catch(() => {
                    });
                    //
                }
            },
            //确认更新主标识
            submitUpdatePrimarykey(evt) {
                console.log(evt)
                if (this.primaryKeyRadio === null || this.primaryKeyRadio === "") {
                    this.$message.warning("请至少选择一个属性")
                    return;
                }
                var primaryValue = this.findItemFormMatchPropertys(this.primaryKeyRadio)
                //
                this.$confirm('确定添加属性:[' + primaryValue.name + ']   为主标识？')
                    .then(() => {
                        //确定添加属性到主标识
                        //
                        if (this.primaryKeyList.length > 0) {
                            this.$message.warning("已存在主标识")
                        } else {
                            var code = primaryValue.code;
                            var value = primaryValue.name;
                            var item = {'code': code, 'value': value}
                            //主标识添加
                            this.primaryKeyList.push(item)
                            //清空选择
                            this.primaryKeyRadio = null
                            //关闭弹出框
                            this.primaryKeydialogVisible = false
                        }

                    })
                    .catch(() => {

                    });
            },
            /**
             * 取消更新主标识
             */
            cancelUpdatePrimaryKey() {
                this.$confirm('确认关闭，放弃添加主标识？')
                    .then(() => {
                        //单选值为空
                        this.primaryKeyRadio = null;
                        //关闭弹出窗口
                        this.primaryKeydialogVisible = false
                    })
                    .catch(() => {

                    });
            },
            //***************************主标识相关操作函数结束***************************************
            //通过code获取值
            /**
             * 通过code获取属性值
             * @param var1
             */
            findItemFormMatchPropertys(var1) {
                var data = null
                this.matchPropertys.forEach(
                    element => {
                        if (element.code === var1) {
                            data = element
                        }
                    }
                )
                return data
            },
            //
            getMatchFactorListInfo() {
                getMatchFactorList().then(res => {
                    console.log(res)
                    this.matchFactorList = res.data
                }).catch(error => {
                    console.error(error)
                })
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

    .div-el-radio-button {
        border: 1px solid #dfffbc;
        margin-left: 20px;
        margin-top: 20px;
    }

    .div-el-checkbox-button {
        border: 1px solid #dfffbc;
        margin-left: 20px;
        margin-top: 20px;
    }
</style>
