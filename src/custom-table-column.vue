<template>
    <table-column
        :min-width="prop.width ||　width"
        :label="prop[propKey.label]"
        :fixed="prop.fixed"
        :header-align="prop.headerAlign"
        :render-header="prop.renderHeader"
        :sortable="prop.sortable"
        :sort-method="prop.sortMehtod"
        :sort-by="prop.sortBy"
        :resizable="prop.resizable"
        :formatter="prop.formatter"
        :show-overflow-tooltip="prop.showOverflowTooltip"
        :align="prop.align"
        :class-name="prop.className"
        :selectable="prop.selectable"
        :reserve-selection="prop.reserveSelection"
        :filters="prop.filters"
        :filter-multiple="prop.filterMultiple"
        :filter-method="prop.filterMethod"
        :filtered-value="prop.filteredValue"
        :prop="prop.prop"
        :label-class-name="prop.labelClassName"
        :show-slot="Boolean(prop.showSlot)">

        <custom-table-column
            v-for="v of prop[propKey.children]"
            :key="v[propKey.label] + v.prop"
            :prop="v"
        ></custom-table-column>

        <template
            v-if="!Boolean(prop[propKey.children])"
            slot-scope="s">

            <slot
                :row="s.row"
                :index="s.$index"
                :name="prop[propKey.label]"
                :column="s.column"
            ></slot>

        </template>

    </table-column>
</template>

<script>
    import TableColumn from 'element-table-column'
    export default {
        name: 'custom-table-column',
        components: {
            TableColumn
        },
        props: {
            prop: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            propKey: {
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
            }
        }
    }
</script>
