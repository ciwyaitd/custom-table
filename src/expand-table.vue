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

        <table-column
            v-if="!reRendering"
            v-for="(v, k) in props.slice(0, left)"
            :key="v[propsKey.label]"
            :min-width="columnWidth(v, k)"
            :label="v[propsKey.label]"
            :fixed="isChild ? false : v.fixed"
            :header-align="v.headerAlign"
            :render-header="v.renderHeader"
            :sortable="v.sortable"
            :sort-method="v.sortMehtod"
            :sort-by="v.sortBy"
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
            :label-class-name="v.labelClassName"
            :show-slot="isShowSlot(v, k)"
            >

            <template
                v-if="!v[propsKey.children]"
                slot-scope="s">

                <slot
                    :row="s.row"
                    :index="s.$index"
                    :name="v[propsKey.label]"
                    :column="s.column"
                ></slot>

            </template>

        </table-column>

        <table-column
            v-if="props[0] && props[0].expand && !reRendering"
            type="expand"
            key="expand"
            :fixed="isChild ? false : props[0].fixed"
            >

            <template slot-scope="s">
                <expand-table
                    v-if="s.row[propsKey.children][0][propsKey.children]"
                    :isChild="true"
                    :data="s.row[propsKey.children]"
                    :props="props"
                    :props-key="propsKey"
                    :row-key="key"
                    :parentId="_id"
                    :left="left"
                    :key="_id"
                ></expand-table>

                <last-table
                    v-else
                    :data="s.row[propsKey.children]"
                    :props="props"
                    :left="left"
                ></last-table>
            </template>

        </table-column>

        <custom-table-column
            v-if="!reRendering"
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
    import TableColumn from 'element-table-column'
    import LastTable from './last-table.vue'
    import ExpandTableStore from './expend-table-store.js'

    const store = new ExpandTableStore()
    let _id = 1

    export default {
        name: 'expand-table',
        components: {
            ElTable,
            CustomTableColumn,
            TableColumn,
            LastTable
        },
        props: {
            isChild: {
                type: Boolean,
                default: false
            },
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
            expandKeys: {
                type: Array,
                default: () => []
            },
            left: {
                type: Number,
                default: 1
            },
            parentId: String,
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
            highlightCurrentRow: Boolean,
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
            defaultExpandAll: Boolean,
        },
        data() {
            return {
                reRendering: false,
                _id: '',
            }
        },

        computed: {
            expandRowKeys() {
                return store.rowKeys(this._id)
            },
            key() {
                return this.rowKey || (this.props[0] && this.props[0].prop)
            },
            listeners() {
                return {
                    ...this.$listeners,
                    'expand-change': (row, expandedRows) => {
                        let key = String(row[this.key])
                        let expanded = this.expandRowKeys.indexOf( key ) === -1
                        // if (expanded) {
                        //     store.commit('addRowKeys', this._id, key)
                        //     return
                        // }
                        // this.removeRowKeys(this._id, key)
                    },
                    'row-click': () => {
                        console.log(123)
                    }
                }
            }
        },

        watch: {
            expandKeys: {
                handler: 'setExpandKeys',
                immediate: true
            },
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

        methods: {
            expand() {
                console.log('expand')
            },
            rowClick() {
                console.log('click')
            },
            isShowSlot(column, idx) {
                if (Boolean(column.showSlot)) {
                    return true
                }
                return this.className(idx) === 'index-col' && isChild
            },
            columnWidth(column, idx) {
                let isExpandedCol = Number(idx) === this.left - 1
                if (column.width) {
                    return isExpandedCol ? column.width - 48 : column.width
                }
                return this.width
            },
            setExpandKeys() {
                if (this.expandKeys.length) {
                    this.setRowKeys(this._id, this.expandKeys)
                }
            },
            bindEvent(id, $el) {
                // this.$nextTick(() => {
                //     let trEls = ($el || this.$el).querySelectorAll('tbody > tr.el-table__row')
                //     ; [].forEach.call(trEls, el => {
                //         el.addEventListener('mouseenter', (e) => {

                //         })
                //     })
                // })
            },
            register(id) {
                if (!id) return
                tableEls[id] = this.$el
            },
            className(column, idx) {
                let clsName = ''
                if (Number(idx) === this.left - 1) {
                    clsName = 'indent-col '
                }
                return clsName + (column.className || '')
            },
            rowClassName({ row, rowIndex }) {
                if (!row[this.propsKey.children] ||
                    !row[this.propsKey.children].length) {

                    return 'empty-child-row'
                }
                return ''
            },
        },

        mounted() {
            if (!this.props[0] || !this.props[0].fixed) return

        },
        updated() {
            if (this.isChild) return
            this.register(this._id)
        },
        beforeMount() {
            if (this.isChild) {
                this._id = this.parentId
                return
            }
            this._id = 'expand-table-' + _id++
        },
        destroyed() {
            tableEls[this._id] = null
            delete tableEls[this._id]
        },

        install(Vue, options = {}) {
            Vue.component(options.name || this.name, this)
        }
    }

    let tableEls = {}
    const handleHover = (id, el) => {
        let trEls = tableEls[id].querySelectorAll('tr.el-table__row')

    }
</script>

<style>
    /* .mul-expand-table tr.expanded > td:first-child {
        border-bottom: none;
    }

    .mul-expand-table .el-table__expanded-cell .el-table__expanded-cell .el-table::before {
        content: none;
    }

    .mul-expand-table .el-table__expanded-cell .el-table__expanded-cell .el-table tr td:first-child {
        border-bottom: 0;
    } */
</style>
<style scoped>
    .el-table--border,
    .el-table--border >>> .el-table--border {
        border-left: none;
    }

    .el-table--border >>> td,
    .el-table--border >>> th {
        border-right: none;
        border-left: 1px solid #ebeef5;
    }

    .el-table--border >>> .el-table__expand-column {
        border-left: none;
    }

    .expand-table >>> .el-table__expanded-cell {
        padding: 0;
        box-shadow: none;
        background-color: #fff;
        border-bottom: 0;
        border-left: 0;
    }

    .expand-table >>> .el-icon-arrow-right {
        width: 10px;
        height: 10px;
        border-style: solid;
        border-width: 0 0 1px 1px;
        border-color: #ebeef5;
        box-sizing: border-box;
        transform: rotate(-45deg);
    }

    .expand-table >>> .el-table__expand-icon--expanded .el-icon-arrow-right {
        transform: rotate(45deg);
    }
</style>
