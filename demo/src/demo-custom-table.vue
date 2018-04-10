<template>
    <custom-table
        :props="props"
        :data="data"
        @row-click="rowClick"
    ></custom-table>
</template>

<script>
    export default {
        data: () => {
            return {
                props: [{
                    label: '日期',
                    fixed: true,
                    width: 140,
                    prop: 'date'
                }, {
                    label: '姓名',
                    fixed: true,
                    prop: 'name'
                }, {
                    label: '地址',
                    headerAlign: 'center',
                    children: [{
                        label: '省份',
                        prop: 'province'
                    }, {
                        label: '城市',
                        prop: 'city'
                    }, {
                        label: '区/县',
                        prop: 'region'
                    }]
                }, {
                    label: '商品',
                    headerAlign: 'center',
                    children: [{
                        label: '生产日期',
                        prop: 'product_date',
                        width: 140
                    }, {
                        label: '名称',
                        prop: 'goods_name',
                        width: 140
                    }, {
                        label: '描述',
                        prop: 'description',
                        width: 300,
                    }]
                }, {
                    label: '其他',
                    width: 130,
                    fixed: 'right',
                    prop: 'other',
                }],
                data: [
                    {
                        date: '2018年04月05日',
                        name: '老王',
                        province: '广东',
                        city: '广州',
                        region: '番禺',
                        product_date: '2018年04月05日',
                        goods_name: '好滋好味鸡蛋仔',
                        description: '荷兰优质淡奶，奶香浓而不腻',
                        other: '-'
                    },
                    {
                        date: '2018年04月05日',
                        name: '老王',
                        province: '广东',
                        city: '广州',
                        region: '番禺',
                        product_date: '2018年04月05日',
                        goods_name: '好滋好味鸡蛋仔',
                        description: '荷兰优质淡奶，奶香浓而不腻',
                        other: '-'
                    },
                ]
            }
        },
        methods: {
            rowClick(row, event) {
                console.log(row, event)
            }
        }

    }
</script>
