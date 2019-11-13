<template>
  <div>
    <el-form>
      <el-form-item></el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <div>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
];

export default {
  name: 'Table',
  setup() {
    const data = ref(tableData);

    const currentPage = ref(1);
    const pageSizes = ref([10, 20, 30, 40, 50]);
    const pageSize = ref(10);
    const layout = 'total, sizes, prev, pager, next, jumper';
    const total = ref(7);

    const handleSizeChange = size => {
      pageSize.value = size;
    };
    const handleCurrentChange = pageNum => {
      currentPage.value = pageNum;
    };

    return {
      data,
      handleSizeChange,
      handleCurrentChange,
      currentPage,
      pageSizes,
      pageSize,
      layout,
      total
    };
  }
};
</script>

<style>
.pagination {
  margin-top: 16px;
  text-align: right;
}
</style>
