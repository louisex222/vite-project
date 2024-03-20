import indexNo from '../index-nojwt'
import index from '../index'

export const apiLogin = (data:any) :any => {
    return indexNo({
        url: '/api/Member/Login',
        method: 'post',
        data
    })
}

export const apiLogout = ():Promise<any>=>{
    return index({
        url: '/api/Member/Logout',
        method: 'post',
        data: {}
    })
}