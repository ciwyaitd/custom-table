<template>
    <div id="app">
        <h1 class="title" title="custom table">custom table</h1>
        <small>
            <a @click="$refs['app'].open()">whold page usage</a>
        </small>
        <demo-block ref="app" name="app"></demo-block>

        <div class="content">

            <h3 class="sub-tit">
                <span>custom-table:</span>
                <small>
                    <a @click="$refs['demo-custom-table'].open()">usage</a>
                </small>
            </h3>
            <demo-custom-table></demo-custom-table>
            <demo-block ref="demo-custom-table" name="demo-custom-table"></demo-block>

            <h3 class="sub-tit">
                <span>custom-table-with-slot:</span>
                <small>
                    <a @click="$refs['demo-custom-table-with-slot'].open()">usage</a>
                </small>
            </h3>
            <demo-custom-table-with-slot></demo-custom-table-with-slot>
            <demo-block ref="demo-custom-table-with-slot" name="demo-custom-table-with-slot"></demo-block>

             <h3 class="sub-tit">
                <span>custom-table-with-slot( expand mode ):</span>
                <small>
                    <a @click="$refs['demo-custom-table-with-slot-expand'].open()">usage</a>
                </small>
            </h3>
            <demo-custom-table-with-slot-expand></demo-custom-table-with-slot-expand>
            <demo-block ref="demo-custom-table-with-slot-expand" name="demo-custom-table-with-slot-expand"></demo-block>

            <h3 class="sub-tit">
                <span>expand-table:</span>
                <small>
                    <a @click="$refs['demo-expand-table'].open()">usage</a>
                </small>
            </h3>
            <demo-expand-table></demo-expand-table>
            <demo-block ref="demo-expand-table" name="demo-expand-table"></demo-block>
        </div>

    </div>
</template>

<script>
    import DemoCustomTable from './demo-custom-table.vue'
    import DemoCustomTableWithSlot from './demo-custom-table-with-slot.vue'
    import DemoCustomTableWithSlotExpand from './demo-custom-table-with-slot-expand.vue'
    import DemoBlock from './demo-block.vue'
    import DemoExpandTable from './demo-expand-table.vue'

    export default {
        data: () => {
            return {}
        },
        components: {
            DemoCustomTable,
            DemoCustomTableWithSlot,
            DemoBlock,
            DemoExpandTable,
            DemoCustomTableWithSlotExpand,
        },
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    a {
        color: #4291ea;
        text-decoration: underline;
        cursor: pointer;
    }

    #app {
        height: 100%;
        min-height: 100vh;
        padding-top: 100px;
        background-color: #f7f8fa;
        background-image:
            linear-gradient(90deg, rgba(255, 255, 255, .07) 50%, transparent 50%),
            linear-gradient(90deg, rgba(255, 255, 255, .13) 50%, transparent 50%),
            linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, .17) 50%),
            linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, .19) 50%);
        background-size: 13px, 29px, 37px, 53px;
        text-align: center;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }

    .title {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 0;
    }

    .title::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        background-color: rgba(0, 0, 0, .1);
        filter: blur(4px);
        z-index: 0;
    }

    .title::after {
        position: relative;
        content: "" attr(title) "";
        font-size: 54px;
        color: #fff;
        text-shadow: 0 1px 0 #9f9a7d, 0 2px 0 #7e7a64, 0 3px 0 #54513f;
        z-index: 2;
        line-height: 100px;
    }

    .content {
        margin: 30px auto;
        max-width: 1100px;
    }

    .sub-tit {
        margin: 10px 0;
        text-align: left;
    }
</style>
