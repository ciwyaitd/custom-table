/*
 * expend table store
 * @Author: hejinming
 * @Date: 2018-04-06 15:27:29
 * @Last Modified by: hejinming
 * @Last Modified time: 2018-04-30 15:06:47
 */

class Store {
    constructor() {
        this.rowKeysMap = null
        this.levelTableStore = {}
    }

    get tStore() {
        return (id, level) => {
            if (!this.levelTableStore ||
                !this.levelTableStore[id] ||
                !this.levelTableStore[id][level]) return {}
            return this.levelTableStore[id][level]
        }
    }

    set tStore(payload) {
        if (!payload || !payload.id) return
        // 设置 store
        const { id, level, store } = payload
        if (id && level && store) {
            if (this.levelTableStore[id]) {
                if (!this.levelTableStore[id][level]) {
                    this.levelTableStore[id][level] = store
                }
            } else {
                this.levelTableStore[id] = {}
                this.levelTableStore[id][level] = store
            }
        } else {
            // 如果没有 level，则删除 id 内容
            if (!level) {
                this.levelTableStore[id] = null
                delete this.levelTableStore[id]
            } else {
                // 如果没有 store，则删除 level 内容
                this.levelTableStore[id][level] = null
                delete this.levelTableStore[id][level]
            }
        }
    }

    get rowKeys() {
        return (id) => {
            if (!this.rowKeysMap || !this.rowKeysMap[id]) return []
            return this.rowKeysMap[id]
        }
    }

    addRowKeys(key, value) {
        let rowKeysMap = Object.assign({}, this.rowKeysMap)
        if (!rowKeysMap[key]) {
            rowKeysMap[key] = [value]
        } else {
            rowKeysMap[key].push(value)
        }
        this.rowKeysMap = rowKeysMap
    }

    removeRowKeys(key, value) {
        let rowKeysMap = Object.assign({}, this.rowKeysMap)
        if (!rowKeysMap[key]) return
        let idx = this.rowKeysMap[key].indexOf(value)
        rowKeysMap[key].splice(idx, 1)
        this.rowKeysMap = rowKeysMap
    }

    setRowKeys(key, value) {
        let rowKeysMap = Object.assign({}, this.rowKeysMap)
        if (!rowKeysMap[key]) {
            rowKeysMap[key] = value
        } else {
            rowKeysMap[key] = rowKeysMap[key].concat(value)
        }
        this.rowKeysMap = rowKeysMap
    }

    delRowKeys(key) {
        let rowKeysMap = Object.assign({}, this.rowKeysMap)
        if (!rowKeysMap || !rowKeysMap[key]) return
        rowKeysMap[key] = null
        delete rowKeysMap[key]
        this.rowKeysMap = rowKeysMap
    }
}

export default Store
