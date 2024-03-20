
import numeral from 'numeral'

/**
 * 無條件捨去
 * @param {Number} num
 * @param {Number} decimal
 * @returns {Number}
 */
export const getFloorNumber = (num: number, decimal: number = 2): number => {
    return Math.floor((num + Number.EPSILON) * 10 ** decimal) / 10 ** decimal;
}

/**
 * 獲取隨機數字
 * @param {Number} min
 * @param {Number} max
 * @param {Number} decimal
 * @returns {Number}
 */
export const getRandomNumber = (min: number = 0, max: number = 100, decimal: number = 2): number => {
    const range = max - min;
    const result = Math.random() * range + min;
    return getFloorNumber(result, decimal);
}

/**
 * 轉換顯示數值
 * @param {Number} num
 * @param {String} format
 * @returns {String|undefined}
 */
export const numeralFormat = (num: number, format: string = '0.00'): String | undefined => {
    const data: number | null = numeral(num).value();
    if (data !== null) {
        const formatNumber = data < 0
            ? `-${numeral(data * -1).format(format, Math.floor)}`
            : numeral(num).format(format, Math.floor);
        return formatNumber;
    }
}


// 隨機英數字特殊符號組合
export const randomString = (len: number): string => {
    len = len || 32;
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678!@#$%^&*()_+{}|:"<>?';
    const maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}