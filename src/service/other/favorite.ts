import index from '../index';

export const apiGetfavoriteGame = (): any => {
    return index({
        url: '/api/Game/GetAllFavorite',
        method: 'post',
        data: {}
    })
}

export const apiAddFavoriteGame = (data: any): any => {
    return index({
        url: '/api/Game/AddFavorite',
        method: 'post',
        data: data
    })
}