<template>
    <el-table
        :data="data"
        :border="border"
        :stripe="stripe"
        :height="height"
        :fit="fit"
        :show-header="showHeader"
        :hightlight-current-row="highlightCurrentRow"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :row-key="rowKey"
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
        v-on="$listeners"
        >

        <custom-table-column
            v-if="!reRendering"
            v-for="v of props"
            :key="v[propsKey.label]"
            :prop="v"
            :propKey="propsKey">
        </custom-table-column>

    </el-table>
</template>

<script>
    import { ElTable } from 'element-table'
    import CustomTableColumn from 'custom-table-column.vue'

    export default {
        name: 'custom-table',
        components: {
            ElTable,
            CustomTableColumn
        },
        props: {
            data: {
                type: Array,
                default: () => []
            },
            props: {
                type: Array,
                default: () => []
            },
            propsKey: {
                type: Object,
                default: () => {
                    return {
                        label: 'label',
                        children: 'children'
                    }
                }
            },
            height: [String, Number],
            stripe: Boolean,
            border: Boolean,
            fit: {
                type: Boolean,
                default: true
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            highlightCurrentRow: Boolean,
            rowClassName: [String, Function],
            rowStyle: [Object, Function],
            rowKey: [String, Function],
            showSummary: Boolean,
            summaryMethod: Function,
            spanMethod: Function,
            sumText: String,
            cellClassName: [String, Function],
            cellStyle: [Object, Function],
            headerRowClassName: [String, Function],
            headerRowStyle: [Object, Function],
            headerCellClassName: [String, Function],
            headerCellStyle: [Object, Function],
            currentRowKey: [String, Number],
            emptyText: String,
            defaultSort: Object,
            tooltipEffect: String,
        },
        data: () => {
            return {
                reRendering: false
            }
        },

        watch: {
            props: {
                handler: () => {
                    this.reRendering = true
                    this.$nextTick(() => {
                        this.reRendering = false
                    })
                },
                deep: true
            }
        },

        install(Vue, options = {}) {
            Vue.component(options.name || this.name, this)
        }
    }
</script>
