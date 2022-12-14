<template>
  <div class="xl-table">
    <div class="header">
      <slot name="header">
        <!-- 表格名称 -->
        <div class="title">{{ title }}</div>
        <!-- 表格头部右侧可传入操作的按钮的插槽 -->
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 可以使用插槽在表格插入想传入的内容，这里会通过作用域插槽把每一行的内容传递出来 -->
          <template #default="scope">
            <!-- 拿到每一个数据的prop字段，prop指定放在哪一列，对应每一列的列名 -->
            <!-- 根据是否传入的插槽名，自定义每一列插入的内容，如果没有传插槽名，就默认展示下面的文本 -->
            <!-- 外界使用时通过指定插槽名自定义每一列内容，这里再通过作用域插槽把内容(scope.row)传递给外界 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[2, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // 数据表格头部的名称
    title: {
      type: String,
      default: ''
    },
    // 列表的数据信息
    listData: {
      type: Array,
      required: true
    },
    // 需要展示的数据总条数
    listCount: {
      type: Number,
      default: 0
    },
    // 列表的表头名称配置信息
    propList: {
      type: Array,
      required: true
    },
    // 是否展示每一项的序号
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 控制展示每一项的选中，checkbox
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // 外界双向绑定有关分页相关的数据
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    // 控制是否可以多级展开，有子项
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 控制是否展示底部footer(分页器)
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    // 当分页器的当前页发生变化时，通知外面更改pageInfo
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    // 每一页展示条数改变时，一样通知外面更改
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    return { handleSelectionChange, handleSizeChange, handleCurrentChange }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
