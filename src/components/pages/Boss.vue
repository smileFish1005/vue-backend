<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            
        </div>
        <div class="handle-box">
            <el-button class="handle-del mr10" @click="handle_delete_bat()">批量删除</el-button>
            <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="1"></el-option>
                <el-option key="2" label="湖南省" value="2"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search">搜索</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="chargeName" label="方案名称" sortable width="150">
            </el-table-column>
            <el-table-column prop="validTime" label="有效期" width="120">
            </el-table-column>
            <el-table-column prop="memberDiscounts" label="会员折扣" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                     :page-size="5"
                    :total="total">
            </el-pagination>
        </div>
        <div class="template">
            <el-dialog title="编辑" :visible.sync="dialogFormVisible">
                <el-form ref="editForm" :rules="rules" :model="editForm" :inline="true">
                    <el-form-item label="活动名称"   prop="name">
                      <el-input v-model="editForm.name"  placeholder="请填写活动名称" size="min"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" prop="region">
                      <el-select v-model="editForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="活动性质" prop="type">
                        <el-checkbox-group v-model="editForm.type">
                          <el-checkbox label="美食/餐厅线上活动"></el-checkbox>
                          <el-checkbox label="地推活动"></el-checkbox>
                          <el-checkbox label="线下主题活动"></el-checkbox>
                          <el-checkbox label="单纯品牌曝光"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="特殊资源"  prop="resource">
                        <el-radio-group v-model="editForm.resource">
                          <el-radio label="6">线上品牌商赞助</el-radio>
                          <el-radio label="5">线下场地免费</el-radio>
                        </el-radio-group>
                      </el-form-item>
                </el-form>   
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit('editForm')">确 定</el-button>
              </div>
            </el-dialog>   
        </div>
    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                url: (process.env.NODE_ENV === 'development'?'boss/list':'../../../static/vuetable.json'),
                tableData: [],
                total:0,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                loading: true,
                searchForm:{},

                selectedRow:{},
                rules:{
                    name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                  ],
                  region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                  ],
                  type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                  ],
                  resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                  ]
                },

                dialogFormVisible:false,
                dialog:{
                    url:(process.env.NODE_ENV === 'development'?'/boss/movie/charge':'../../../static/vuetable.json'),
                    type:'add'   //请求类型  是添加还是编辑
                },
                editForm:{
                    name:"",
                    region:"",
                    type:[],
                    resource:''      
                }
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;

                self.$axios.get(self.url, {page:self.cur_page,rows:10,sort:'chargeName',order:'asc'}).then((res) => {
                    console.log(res)
                    self.tableData = res.data.rows;
                    self.loading = false ;
                })
            },
            formatter(row, column, cellValue) {
                var str ='原价' ;
                if(row.memberDiscounts){
                    str = '半价' ;
                }
                return str;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleAdd() {
                this.dialog.url = this.url+'?type=add' ;
                this.dialog.type = 'add';
                this.dialogFormVisible = true;

                //this.$refs['editForm'].resetFields();
            },
            handleEdit(index,row) {
                //this.$refs['editForm'].resetFields();
                this.dialog.url = this.url+'?type=edit' ;
                this.dialog.type = 'edit';

                this.dialogFormVisible = true;
                this.selectedRow = {'index':index ,'row':row};
            },
            handleDelete(index) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    this.tableData.splice(index,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
            },
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },
            handle_delete_bat:function(){
                let self = this ;
                let indexs = Array.of() ;
                if(this.multipleSelection.length==0){
                    this.$message.error('请先选择一条记录哦');
                } else{
                    this.tableData.forEach(function(obj,index){
                        self.multipleSelection.forEach(function(mult){
                            if(obj.name ==mult.name){
                                indexs.push(index);
                            }        
                        })        
                    })
                    indexs.reverse().forEach(function(v){
                        self.tableData.splice(v,1);                 
                    })
                }  
            },
            submit:function (formName){
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    this.$axios.post(this.dialog.url, {page:this.cur_page}).then((res) => {
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        if(this.dialog.type=='add'){
                            this.tableData.push({"date":"1995-12-11","name":"熊明323","address":"湖南省 怀化市 通道侗族自治县add"});     
                        }else{
                            this.tableData.splice(this.selectedRow.index, 1,{"date":"1995-12-11","name":"熊明323","address":"湖南省 怀化市 通道侗族自治县"});   
                        }
                        this.dialogFormVisible = false ;
                    })
                  } else {
                    return false;
                  }
                });
            }
        }
    }
    //test
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-del{
    border-color: #bfcbd9;
    color: #999;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>