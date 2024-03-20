import index from '../index-nojwt';

interface Jackpot {
    currency: String;
    startTime: String;
    endTime: String;
}
export const getJackpotApi = (data: Jackpot): any => {
    return index({
        url: '/api/Game/JackpotCollection',
        method: 'post',
        data
    })
}

