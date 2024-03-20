import { getSlotGameListApi } from '@/service/game/detail'
interface Param {
    key: string,
    callback: (param: string) => Promise<any>,
    param: string
}
export const addLocalStorage = async (data: Param) => {
    const localData = localStorage.getItem(data.key)
    if (!localData) {
        const res = await data.callback(data.param)
        localStorage.setItem(data.key, JSON.stringify(res))
        return res
    } else {
        return localData ? JSON.parse(localData) : ''
    }
}

export const getSlotRoyalGameList = async () => {
    const awaitData = await addLocalStorage({
        key: 'slotRoyalGameList',
        callback: getSlotGameListApi,
        param: 'Royal'
    })
    return awaitData
}
export const getSlotJDBGameList = async () => {
    const awaitData = await addLocalStorage({
        key: 'slotJDBGameList',
        callback: getSlotGameListApi,
        param: 'JDB'
    })
    return awaitData
}