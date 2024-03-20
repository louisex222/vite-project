import index from '../index-nojwt'

export const rcgandroyalHotGameListApi = (): Promise<any> => {
    return index({
        url: '/WebCache/GetHomePageSetting',
        method: 'get',
        data: {}
    })
}

export const getSlotGameListApi = (club: string): Promise<any> => {
    return index({
        url: `/webCache/GetSlotGame${club}List`,
        method: 'get',
        data: {}
    })
}