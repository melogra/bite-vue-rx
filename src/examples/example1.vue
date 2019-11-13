<template>
  <div>
    <el-table :data="tableData$" border style="width: 100%" v-stream:sort-change="sort$">
      <el-table-column fixed prop="date" label="日期" width="150" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="province" label="省份" width="120"></el-table-column>
      <el-table-column prop="city" label="市区" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-stream:click="{ subject: operation$, data: scope }" type="text" size="small">操作</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-stream:size-change="pageSize$"
      v-stream:current-change="page$"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total$"
    ></el-pagination>
  </div>
</template>

<script>
import { from, combineLatest, of, merge } from 'rxjs';
import { stream } from './operators';
import { map, share, switchMapTo, switchMap } from 'rxjs/operators';

const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1517 弄',
    zip: 200333
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1519 弄',
    zip: 200333
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1516 弄',
    zip: 200333
  }
];
export default {
  name: 'TablePage',
  data() {
    return {
      currentPage: 1
    }
  },
  domStreams: [
    'page$',
    'pageSize$',
    'sort$',
    'operation$'
  ],
  subscriptions() {
    const params$ = combineLatest(
      this.page$.pipe(stream(1)),
      this.pageSize$.pipe(stream(100)),
      this.sort$.pipe(stream({ prop: 'id', isDescending: true }))
    ).pipe(
      map(this.normalize)
    )

    const fetch$ = merge(params$, this.operation$.pipe(switchMapTo(params$)))

    const tableData$ = fetch$.pipe(
      switchMap(
        params => this.getTableData(params)
      ),
      share()
    )
    const total$ = tableData$.pipe(map(data => data.length))
    return {
      tableData$,
      total$
    }
  },
  methods: {
    handleClick() {
      // console.log(row)
    },
    normalize([page, pageSize, sort]) {
      return {
        page,
        pageSize,
        sort
      }
    },
    getTableData(params) {
      console.log(params)
      return Promise.resolve(tableData)
    }
  }
};
</script>

<style>
</style>
