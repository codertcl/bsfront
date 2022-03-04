/*
* 操作sessionStorage
*/
export const getItem = (name) => {
    const data = window.sessionStorage.getItem(name)
    try {
        //data可能不是JSON格式字符串
        return JSON.parse(data)
    } catch (e) {
        return data
    }
}

export const setItem = (name, data) => {
    //设置的数据值只能是字符串，对象需要先转换为字符串
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    window.sessionStorage.setItem(name, data)
}

export const removeItem = (name) => {
    return window.sessionStorage.removeItem(name)
}
