<template>
    <transition name="fade">
        <div class="code-block" v-show="show" @click.stop>
            <pre>
                <code ref="demo"></code>
            </pre>
        </div>
    </transition>
</template>

<script>
    import hlj from './highlight.js'

    export default {
        props: {
            name: String
        },
        data: () => {
            return {
                show: false,
                _id: ''
            }
        },
        mounted() {
            let demoEl = this.$refs.demo

            demoEl.textContent = this.str
            hlj.highlightBlock(demoEl)
        },
        computed: {
            str() {
                if (this.name) {
                    try {
                        return require(`./${this.name}.txt`)
                    } catch (error) {
                        console.log('no such file')
                    }
                }
                return ''
            }
        },
        methods: {
            open() {
                this.show = true
            },
            register(id, instance) {
                if (id && instance) {
                    instances[id] = instance
                }
            },
            deregister(id) {
                if (id && instances[id]) {
                    instances[id] = null
                    delete instances[id]
                }
            },
            handleClose() {
                this.show = false
            }
        },
        watch: {
            show(val) {
                if (val) {
                    sideStack.push(this._id)
                } else {
                    let idx = sideStack.indexOf(this._id)
                    sideStack.splice(idx, 1)
                }
            },
        },
        beforeMount() {
            this._id = 'demo' + id++
            this.register(this._id, this)
        },
        beforeDestroy() {
            this.deregister(this._id)
        },
    }

    let id = 1
    const instances = {}
    let sideStack = []
    const getTopSide = () => {
        if (sideStack.length === 0) return
        const topSideId = sideStack[sideStack.length - 1]
        const instance = instances[topSideId]
        return instance
    }
    const handleClose = () => {
        const topSide = getTopSide()
        if (topSide && topSide.handleClose) {
            topSide.handleClose()
        }
    }

    window.addEventListener('click', (event) => {
        handleClose()
    }, false)
</script>

<style src="highlight.js/styles/github-gist.css"></style>
<style scoped>
    .code-block {
        position: fixed;
        top: 0;
        right: 0;
        width: 600px;
        height: 100vh;
        padding: 0 20px;
        background-color: #fff;
        border-left: 1px solid #ebebeb;
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
        z-index: 99;
        box-sizing: border-box;
        overflow: scroll;
    }

    code {
        text-align: left;
        line-height: 1.5;
        font-size: 12px;
        border-radius: 5px;
        background: #f4f4f4 !important;
        font-family: Roboto Mono, monospace;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: .3s;
        transform: translateX(0);
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
</style>
