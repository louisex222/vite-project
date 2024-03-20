import index from '../index-nojwt'

// 獲取遊戲分類
export const apiGetGameTypeList: any = (): Promise<any> => {
    return index({
        url: '/webCache/GetGameTypeList',
        method: 'get',
        data: {}
    })
}
// 獲取電子分類
export const apiGetCategoryList: any = (): Promise<any> => {
    return index({
        url: '/webCache/GetCategoryList',
        method: 'get',
        data: {}
    })
}
/**
 * 取得館別分類
 */
export const apiGetClubList: any = (): Promise<any> => {
    return index({
        url: '/webCache/GetClubList2',
        method: 'get',
        data: {}
    })
}
