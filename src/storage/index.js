/**
 * Storage封装
 */
const STORAGE_KEY = 'mall'
export default {
    setItem(key, value, module_name) {
        if (module_name) {
            let val = this.getItem(module_name)
            val[key] = value
            this.setItem(module_name, val)
        } else {
            let val = this.getStorage()
            val[key] = value
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
        }
    },
    getItem(key, module_name) {
        //如果要获取某个模块下某个属性值，则要递归getItem
        if (module_name) {
            let val = this.getItem(module_name)
            if (val) return val[key]
        }
        return this.getStorage()[key]
    },
    getStorage() {
        // 获取整个(key)mall下面的所有对象(可以有很多个模块)
        //{"user":{"userName":"jack","age":30}},此user即为一个模块
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
    },
    clear(key, module_name) {
        let val = this.getStorage()
        if (module_name) {
            delete val[module_name][key]
        } else {
            delete val[key]
        }
        //this.setItem(key)
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
}