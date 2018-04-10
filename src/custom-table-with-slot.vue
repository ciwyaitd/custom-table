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

        <table-column
            v-if="!reRendering"
            v-for="v of props"
            :key="v[propsKey.label]"
            :min-width="v.width ||　width"
            :label="v[propsKey.label]"
            :fixed="v.fixed"
            :header-align="v.headerAlign"
            :render-header="v.renderHeader"
            :sortable="v.sortable"
            :sort-method="v.sortMehtod"
            :sort-by="v.sortBy"
            :resizable="v.resizable"
            :formatter="v.formatter"
            :show-overflow-tooltip="v.showOverflowTooltip"
            :align="v.align"
            :class-name="v.className"
            :selectable="v.selectable"
            :reserve-selection="v.reserveSelection"
            :filters="v.filters"
            :filter-multiple="v.filterMultiple"
            :filter-method="v.filterMethod"
            :filtered-value="v.filteredValue"
            :prop="v.prop"
            :label-class-name="v.labelClassName"
            :show-slot="Boolean(v.showSlot)">

            <template
                slot-scope="s">

                <slot
                    :row="s.row"
                    :index="s.$index"
                    :name="v[propsKey.label]"
                    :column="s.column"
                ></slot>

            </template>

        </table-column>

    </el-table>
</template>

<script>
    import { ElTable } from 'element-table'
    import TableColumn from 'element-table-column'

    export default {
        name: 'custom-table-with-slot',
        components: {
            ElTable,
            TableColumn
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
            width: {
                type: Number,
                default: 80
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
