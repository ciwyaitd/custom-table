<template>
    <el-table
        :data="tableData"
        :border="border"
        :stripe="stripe"
        :height="height"
        :fit="fit"
        :show-header="showHeader"
        :hightlight-current-row="highlightCurrentRow"
        :row-class-name="rowClassName"
        :row-style="getRowStyle"
        :row-key="rowKey"
        :show-summary="showSummary"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :sum-text="sumText"
        :cell-class-name="cellClassName"
        :cell-style="getCellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :current-row-key="currentRowKey"
        :empty-text="emptyText"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        v-on="listeners"
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

    let _vue
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
            expandKey: {
                type: Array,
                default: () => []
            },
            expandedAll: {
                type: Boolean,
                default: true
            },
            expandMode: {
                type: String,
                default: 'click'
            }
        },
        data: () => {
            return {
                reRendering: false,
                dataExpandAry: []
            }
        },
        computed: {
            listeners() {
                return {
                    ...this.$listeners,
                    'row-click': (row, event, column) => {
                        if (this.expandMode === 'click' && this.isExpandMode) this.toggleRow(this.tableData.indexOf(row), row)
                        this.$emit('row-click', row, event, column)
                    },
                    'row-dblclick': (row, event) => {
                        if (this.expandMode === 'dblclick' && this.isExpandMode) this.toggleRow(this.tableData.indexOf(row), row)
                        this.$emit('row-dblclick', row, event)
                    }
                }
            },
            tableData() {
                if (this.isExpandMode) {
                    return this.flattenData(this.data, null, 0, this.expandedAll)
                }
                return this.data
            },
            isExpandMode() {
                return this.data.some(v => Boolean(v.children))
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
            },
        },

        methods: {
            flattenData(data, parent, level, expanded) {
                let newData = []
                expanded = expanded === true
                data.forEach((row) => {
                    let rowItem = {
                        level,
                        parent
                    }
                    _vue.set(row, 'expanded', expanded)
                    newData.push(row)
                    this.dataExpandAry.push(rowItem)
                    if (row[this.propsKey.children]) {
                        rowItem.isParent = true
                        rowItem.expanded = expanded
                        newData.push(...this.flattenData(row[this.propsKey.children], rowItem, 1 + level, expanded))
                    }
                })
                return newData
            },
            getRowStyle({row, rowIndex}) {
                if (!this.isExpandMode) return this.rowStyle
                let rowStyle = this.rowStyle
                let style = ''
                if (typeof rowStyle === 'function') {
                    style = rowStyle.call(null, {row, rowIndex})
                }
                let curRow = this.dataExpandAry[rowIndex]
                let show
                if (curRow.parent) {
                    let index = this.dataExpandAry.indexOf(curRow.parent)
                    show = this.tableData[index].expanded
                } else {
                    show = true
                }
                return `${show ? '' : 'display: none'};cursor: pointer;${style}`
            },
            getCellStyle({row, column, rowIndex, columnIndex}) {
                if (this.cellStyle ||
                    !this.dataExpandAry.length) return this.cellStyle
                if (columnIndex === 0) {
                    return {
                        textIndent: 20 * this.dataExpandAry[rowIndex].level + 'px'
                    }
                }
            },
            toggleRow(index, row) {
                let curRow = this.dataExpandAry[index]
                if (index === -1 ||
                    !curRow ||
                    !curRow.isParent) return
                curRow.expanded = !curRow.expanded
                row.expanded = curRow.expanded
            }
        },

        install(Vue, options = {}) {
            // 避免打包时，引入 Vue 依赖
            _vue = Vue
            Vue.component(options.name || this.name, this)
        }
    }
</script>
