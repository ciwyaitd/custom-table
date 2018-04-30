<template>
    <el-table
        :class="{
            'expand-table': true,
            'child-table': isChild,
            'mul-expand-table': left > 1
        }"
        :data="data"
        :border="border"
        :stripe="stripe"
        :height="height"
        :fit="fit"
        :show-header="!isChild"
        :hightlight-current-row="highlightCurrentRow"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :row-key="key"
        :show-summary="showSummary"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :sum-text="sumText"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :current-row-key="currentRowKey"
        :empty-text="emptyText"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :expand-row-keys="expandRowKeys"
        v-on="listeners"
        >
    </el-table>
</template>
