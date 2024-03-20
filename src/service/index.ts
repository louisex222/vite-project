import axios from 'axios';

const baseURL: string = import.meta.env.MODE === 'development' ? 'https://pwaapi.bacctest.com/' : 'https://pwaapi.bacc1688.com/'
const timeout: number = 5000
const service = axios.create({
    baseURL: baseURL,
    timeout,
    headers: {
        'Content-Type': 'application/json'
    }
})
function errorHandle(status: any, message: any) {
    throw new Error(`status: ${status}, message: ${message}`);
}

service.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken')
    if (!token) {
        return Promise.reject('token不存在')
    }
    const { headers, url } = config
    headers['Authorization'] = `Bearer ${token}`
    return config
}, (error) => {
    return Promise.reject(error)
})

service.interceptors.response.use((response) =>{
            return response.data
        }
    , (error) => {
        const { response } = error
        if (response) {
            errorHandle(response.status, response.data.message)
            return Promise.reject(response)
        } else {
            console.log('請求失敗')
        }
    }
)

interface IRequest {
    url: string;
    method: string;
    data: any;
}
const request = ({ url, method, data }: IRequest) => {
    return service({
        url,
        method,
        data
    })
}

export default request

