/*
 * expend table store
 * @Author: hejinming
 * @Date: 2018-04-06 15:27:29
 * @Last Modified by: hejinming
 * @Last Modified time: 2018-04-10 17:55:55
 */
const merge = require('lodash/merge')

class Store {
    constructor() {
        this.rowKeysMap = null
    }

    get rowKeys() {
        let self = this
        return (id) => {
            if (!self.rowKeysMap || !self.rowKeysMap[id]) return []
            return self.rowKeysMap[id]
        }
    }

    addRowKeys(key, value) {
        let rowKeysMap = merge({}, this.rowKeysMap)
        if (!rowKeysMap[key]) {
            rowKeysMap[key] = [value]
        } else {
            rowKeysMap[key].push(value)
        }
        this.rowKeysMap = rowKeysMap
    }

    removeRowKeys(key, value) {
        let rowKeysMap = merge({}, this.rowKeysMap)
        if (!rowKeysMap[key]) return
        let idx = this.rowKeysMap[key].indexOf(value)
        rowKeysMap[key].splice(idx, 1)
        this.rowKeysMap = rowKeysMap
    }

    setRowKeys(key, value) {
        let rowKeysMap = merge({}, this.rowKeysMap)
        if (!rowKeysMap[key]) {
            rowKeysMap[key] = value
        } else {
            rowKeysMap[key] = rowKeysMap[key].concat(value)
        }
        this.rowKeysMap = rowKeysMap
    }
}

export default Store
