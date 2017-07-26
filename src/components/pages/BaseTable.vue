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
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
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
                    :total="1000">
            </el-pagination>
        </div>
        <div class="template">
            <el-dialog title="编辑" :visible.sync="dialogFormVisible">
                <el-form ref="editData" :rules="rules" :model="editData" :inline="true">
                    <el-form-item label="活动名称"   prop="name">
                      <el-input v-model="editData.name"  placeholder="请填写活动名称" size="min"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" prop="region">
                      <el-select v-model="editData.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    
                </el-form>   
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit('editData')">确 定</el-button>
              </div>
            </el-dialog>   
        </div>
    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                url: (process.env.NODE_ENV === 'development'?'/ms/table/list':'../../../static/vuetable.json'),
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                loading: true,

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
                    url:(process.env.NODE_ENV === 'development'?'/ms/table/list':'../../../static/vuetable.json'),
                    type:'add'   //请求类型  是添加还是编辑
                },
                editData:{
                    name:"",
                    region:"",
                    type:[],
                    resource:'0'      
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

                self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                    self.loading = false ;
                })
            },
            formatter(row) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleAdd() {
                this.editData={
                    name:"",
                    region:""   
                } ;


                this.dialog.url = this.url+'?type=add' ;
                this.dialog.type = 'add';
                this.dialogFormVisible = true;
            },
            handleEdit(index,row) {
                this.editData={
                    name:"",
                    region:""   
                } ;
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