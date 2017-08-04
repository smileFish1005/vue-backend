<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> boss</el-breadcrumb-item>
                <el-breadcrumb-item>打包售卖商品套餐 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
              <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>查询条件 </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
              <el-form-item label="打包商品名称：" prop="goodName">
                    <el-input v-model="formInline.goodName" placeholder="打包商品名称"></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="isrelease">
                    <el-select v-model="formInline.isrelease">
                         <el-option v-for="item in formoptions":key="item.value":label="item.label":value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              <el-form-item label="创建时间：" prop="region">
                    <el-date-picker type="daterange" placeholder="选择日期范围"  v-model="formInline.region"></el-date-picker>
              </el-form-item>          
        </el-form>
        <div class="crumbs">
                <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                <el-button type="primary" @click="findList">查询</el-button>
                <el-button @click="resetForm('formInline')"  type="danger">清空条件</el-button>
        </div>
        <el-dialog title="添加套餐" :visible.sync="dialogFormVisible">
            <el-form :model="addForm":inline="true">
              <el-form-item label="打包商品名称：":label-width="formLabelWidth" required>
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品状态：":label-width="formLabelWidth" required>
                    <el-select v-model="addForm.isrelease">
                         <el-option v-for="item in options":key="item.value":label="item.label":value="item.value"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="商品原价（元）：" :label-width="formLabelWidth">
                <el-input v-model="addForm.originalPrice" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="商品应售价（元）" :label-width="formLabelWidth">
                <el-input v-model="addForm.shouldPrice" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="商品会员价（元）：" :label-width="formLabelWidth"  class="single-line"style="margin-right:200px;">
                <el-input v-model="addForm.vipPrice"   auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="IPHONE_PRODUCT_ID" :label-width="formLabelWidth">
                <el-input v-model="addForm.vipPrice" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="IPAD_PRODUCT_ID" :label-width="formLabelWidth">
                <el-input v-model="addForm.vipPrice" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="IPHONE_VIP_PRODUCT_ID" :label-width="formLabelWidth">
                <el-input v-model="addForm.vipPrice" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="IPAD_VIP_PRODUCT_ID" :label-width="formLabelWidth">
                <el-input v-model="addForm.vipPrice" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="" :label-width="formLabelWidth">
              </el-form-item>
               <el-form-item :label-width="formLabelWidth" label="支持终端" prop="type" required >
                  <el-checkbox-group  v-model="addForm.type" style="width:700px;" size="small">
                    <el-checkbox label="Web" name="type"></el-checkbox>
                    <el-checkbox label="PC" name="type"></el-checkbox>
                    <el-checkbox label="m站" name="type"></el-checkbox>
                    <el-checkbox label="安卓手机" name="type"></el-checkbox>
                    <el-checkbox label="超级手机" name="type"></el-checkbox>
                    <el-checkbox label="Pad" name="type"></el-checkbox>
                    <el-checkbox label="Apple iPhone" name="type"></el-checkbox>
                    <el-checkbox label="Apple iPad" name="type"></el-checkbox>
                    <el-checkbox label="乐视电视(SuperTV)" name="type"></el-checkbox>
                    <el-checkbox label="乐视电视(第三方)" name="type"></el-checkbox>
                    <el-checkbox label="乐视电视盒子" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="商品描述："class='label-textarea'>
                  <el-input type="textarea" v-model="addForm.desc" style="width:700px;"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="text" @click="addList()">新增套餐</el-button>

            <el-table :data="tableData" style="width: 100%" ref="tableData" >
              <el-table-column label="子商品类型">
                  <template scope="scope">
                     <el-select v-model="addAlertForm.isrelease1" @change="handleSelectionChange()">
                         <el-option v-for="item in addOptions":key="item.value":label="item.label":value="item.value"></el-option>
                    </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="详细分类">
                <template scope="scope">
                     <el-select v-model="addAlertForm.isrelease2">
                         <el-option v-for="item in addOptions2":key="item.value":label="item.label":value="item.value"></el-option>
                    </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="商品明细">
                <template scope="scope">
                     <el-select v-model="addAlertForm.isrelease3">
                         <el-option v-for="item in addOptions3":key="item.value":label="item.label":value="item.value"></el-option>
                    </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="现价（元）">
                <template scope="scope">
                    <el-input v-model="addForm.shouldPrice" :disabled="true"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="打包售卖价(元)">
                <template scope="scope">
                  <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                  <template scope="scope">
                    <el-button  size="small" type="danger"  @click="handleDelete(scope.$index,'tableData')">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

  export default {
    data() {
      return {
        formInline: {
          goodName: '',
          isrelease:'-1',
          region: ''
        },
        formoptions: [{
          value: '-1',
          label: '全部'
        }, {
          value: '3',
          label: '已发布'
        }, {
          value: '1',
          label: '未发布'
        }],
        dialogFormVisible: false,
        dialogVisible:false,
        addForm: {
          name: '',
          region: '',
          isrelease:'3',
          originalPrice: '',
          shouldPrice:'',
          vipPrice:'',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        options: [{
          value: '3',
          label: '已发布'
        }, {
          value: '1',
          label: '未发布'
        }],
        formLabelWidth: '200px',
        addAlertForm: {
          isrelease1: '0',
          isrelease2: '0',
          isrelease3:'0',
          originalPrice: '',
          shouldPrice:'',
          vipPrice:'',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        addOptions: [{
          value: '0',
          label: '请选择子商品类型'
        }, {
          value: '1',
          label: '会员套餐'
        },{
          value: '2',
          label: 'TVOD点播内容'
        }],
        addOptions2: [{
          value: '0',
          label: '选择'
        }],
        addOptions3: [{
          value: '0',
          label: '选择'
        }],
        tableData: []
      }
      
      },
    methods: {
      addList(){
        this.tableData.push({"date":"1995-12-11","name":"小鱼","address":"天津市add"});

      },
      handleSelectionChange(){        
        this.addOptions2 = [];
        this.addOptions2.push({"value":"0","label":"请选择详细分类"},{"value":"1","label":"乐次元影视会员"},{"value":"2","label":"超级影视会员"});

      },
      findList() {

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, formName) {
        this.tableData.splice(index,1);
      }
      
    }
  }
</script>
<style>
  .el-form-item__label{
    text-align:left;
  }
  .label-size .el-checkbox__label{
    font-size: 10px;
  }
  .label-size .el-checkbox__inner{
    width: 15px;
    height: 15px;
  }
  .label-size .el-checkbox{
    margin-left:0px;
  }
</style>