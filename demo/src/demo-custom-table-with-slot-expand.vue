<template>
    <custom-table-with-slot
        :props="props"
        :data="data"
        border>

        <template
            slot="姓名"
            slot-scope="s">
            <span>姓名:</span>
            <span>{{ s.row.name }}</span>
        </template>
        <template
            slot="地址"
            slot-scope="s">
            <span>地址:</span>
            <span>{{ s.row.province }}</span>
            <span>{{ s.row.city }}</span>
            <span>{{ s.row.region }}</span>
        </template>
        <template
            slot="商品"
            slot-scope="s">
            <span>商品:</span>
            <span>{{ s.row.goods_name }}</span>
        </template>

        <template
            slot="其他"
            slot-scope="s">
            <span>其他:推荐！</span>
        </template>

    </custom-table-with-slot>
</template>

<script>
    export default {
        data: () => {
            return {
                props: [{
                    label: '日期',
                    width: 140,
                    prop: 'date',
                    align: 'left',
                    headerAlign: 'center'
                }, {
                    label: '姓名',
                    prop: 'name',
                    showSlot: true,
                    headerAlign: 'center'
                }, {
                    label: '地址',
                    showSlot: true,
                    headerAlign: 'center'
                }, {
                    label: '商品',
                    showSlot: true,
                    headerAlign: 'center'
                }, {
                    label: '其他',
                    width: 130,
                    showSlot: true,
                    headerAlign: 'center'
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
                        other: '-',
                        children: [
                            {
                                date: '2018年04月06日',
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
                                date: '2018年04月07日',
                                name: '老王',
                                province: '广东',
                                city: '广州',
                                region: '番禺',
                                product_date: '2018年04月05日',
                                goods_name: '好滋好味鸡蛋仔',
                                description: '荷兰优质淡奶，奶香浓而不腻',
                                other: '-',
                                children: [
                                    {
                                        date: '2018年04月06日',
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
                                        date: '2018年04月07日',
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
                            },
                        ]
                    },
                    {
                        date: '2018年04月08日',
                        name: '老王',
                        province: '广东',
                        city: '广州',
                        region: '番禺',
                        product_date: '2018年04月05日',
                        goods_name: '好滋好味鸡蛋仔',
                        description: '荷兰优质淡奶，奶香浓而不腻',
                        other: '-',
                        children: [
                            {
                                date: '2018年04月09日',
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
                                date: '2018年04月10日',
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
                    },
                ]
            }
        },
    }
</script>
