/**
 * 取得時間
 * @param {Number} number
 * @returns {String}
 */

export const fcGetTime = (number: number = 0):string => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate() + number
    const hour = fcAddZero(today.getHours())
    const minute = fcAddZero(today.getMinutes())
    const second = today.getSeconds()
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

/**
 * 兩位數以下補零
 * @param {Number} number
 * @returns {String}
 */

export const fcAddZero = (number: number):string => {
    return number < 10 ? `0${number}` :`${number}`
}
