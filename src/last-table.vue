<template>
    <el-table
        class="last-table"
        :data="data"
        :show-header="false"
        :border="border"
        :stripe="stripe"
        :height="height"
        :fit="fit"
        :hightlight-current-row="highlightCurrentRow"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
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
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        v-on="$listeners"
        >

        <element-table-column
            v-for="(v, k) in props.slice(0, left)"
            :key="v[propsKey.label]"
            :min-width="columnWidth(v, k)"
            :label="v[propsKey.label]"
            :resizable="v.resizable"
            :formatter="v.formatter"
            :show-overflow-tooltip="v.showOverflowTooltip"
            :align="v.align"
            :class-name="className(v, k)"
            :selectable="v.selectable"
            :reserve-selection="v.reserveSelection"
            :filters="v.filters"
            :filter-multiple="v.filterMultiple"
            :filter-method="v.filterMethod"
            :filtered-value="v.filteredValue"
            :prop="v.prop"
        ></element-table-column>

        <element-table-column type="expand" key="expand"></element-table-column>

        <custom-table-column
            v-for="v of props.slice(left)"
            :key="v[propsKey.label]"
            :prop="v"
            :propKey="propsKey">
        </custom-table-column>

    </el-table>
</template>

<script>
    import { ElTable } from 'element-table'
    import CustomTableColumn from 'custom-table-column.vue'
    import ElementTableColumn from 'element-table-column'

    export default {
        components: {
            ElTable,
            CustomTableColumn,
            ElementTableColumn,
        },
        props: {
            left: {
                type: Number,
                default: 1
            },
            data: {
                type: Array,
                default: () => {
                    return []
                }
            },
            props: {
                type: Array,
                default: () => {
                    return []
                }
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
            store: Object,
            parentId: String,
            level: Number,

            height: [String, Number],
            stripe: Boolean,
            border: Boolean,
            fit: {
                type: Boolean,
                default: true
            },
            highlightCurrentRow: Boolean,
            rowClassName: [String, Function],
            rowStyle: [Object, Function],
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
            defaultSort: Object,
            tooltipEffect: String,
        },
        methods: {
            className(column, idx) {
                let clsName = ''
                if (Number(idx) === this.left - 1) {
                    clsName = 'indent-col '
                }
                return clsName + (column.className || '')
            },
            columnWidth(column, idx) {
                let isExpandedCol = Number(idx) === this.left - 1
                if (column.width) {
                    return isExpandedCol ? column.width - 48 : column.width
                }
                return this.width
            },
        },
        computed: {
            tLevel() {
                return 'last-table-' + this.level
            }
        },

        mounted() {
            this.store.tStore = {
                id: this.parentId,
                level: this.tLevel,
                store: this.$children[0].store,
            }
            this.$children[0].store = this.store.tStore(this.parentId, this.tLevel)
        },
        updated() {
            this.store.tStore = {
                id: this.parentId,
                level: this.tLevel,
            }
            this.$nextTick(() => {
                this.store.tStore = {
                    id: this.parentId,
                    level: this.tLevel,
                    store: this.$children[0].store
                }
                this.$children[0].store = this.store.tStore(this.parentId, this.tLevel)
            })
        },
        beforeDestroy() {
            this.store.tStore = {
                id: this.parentId,
                level: this.tLevel,
            }
        }
    }
</script>

<style scoped>
    .last-table >>> .el-table__expand-icon {
        display: none;
    }

    .last-table >>> td:first-child .cell {
        position: relative;
        z-index: 1;
        white-space: nowrap;
    }
</style>
