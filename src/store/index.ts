import { stat } from 'fs'
import { createStore, Store, useStore as allStore } from 'vuex'

export interface State {
    count: number,
    gameTypeList: Object[],
    favoriteGameList: Object[],
    accountInfo: {
        clubcname: string,
    },
    userToken: string
}
const store = createStore<State>({
    state: {
        count: 0,
        gameTypeList: [],
        favoriteGameList: [],
        accountInfo: {
            clubcname: '',
        },
        userToken: ''
    },
    getters: {
        count(state) {
            return state.count
        },
        gameTypeList(state) {
            return state.gameTypeList
        },
        favoriteGameList(state) {
            return state.favoriteGameList
        },
        accountInfo(state) {
            return state.accountInfo
        },
        userToken(state) {
            return state.userToken
        },
        isLogin(state) {
            return state.accountInfo.clubcname ? true : false
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        addGameTypeList(state, data) {
            state.gameTypeList = data
        },
        addFavoriteGameList(state, data) {
            localStorage.setItem('favoriteGameList', JSON.stringify(data))
            state.favoriteGameList = data
        },
        removeFavoriteGameList(state, data) {
            localStorage.removeItem('favoriteGameList')
            state.favoriteGameList = []
        },
        changeAccountInfo(state, data) {
            state.accountInfo = data
            state.userToken = data.token
            localStorage.setItem('accountInfo', JSON.stringify(data))
            localStorage.setItem('userToken', data.token)
        },
        removeAccountInfo(state) {
            localStorage.removeItem('accountInfo')
            localStorage.removeItem('userToken')
            state.accountInfo = {
                clubcname: '',
            }
            state.userToken = ''
        }
    },
})
export function useStore(): Store<State> {
    return allStore()
}
export default store