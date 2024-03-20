import index from '../index'


interface IEnter {
        device : string,
        gameCode : string,
        lang : string,
        lobbyURL : string
}
export const apiEnter = (enterKey:string,data:IEnter)=> {
    return index({
        url: `/api/Game/GetGameToken/${enterKey}`,
        method: 'post',
        data: data
    })
}
