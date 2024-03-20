import { useStore } from 'vuex';
import { apiGetGameTypeList, apiGetClubList } from '@/service/type/config'
import { apiGetfavoriteGame, apiAddFavoriteGame } from '@/service/other/favorite'
import { isMobile } from '@/utils/mobile'
import { apiEnter } from '@/service/game/enter'
import { ElMessage } from 'element-plus'
export default function useHome() {
    const store = useStore();
    const isLogin = computed(() => store.getters.isLogin)
    const favList = computed(() => store.getters.favoriteGameList)
    const clubList: Ref<any[]> = ref([])
    const loading: Ref<boolean> = ref(false)
    /**
     * fcGetGameTypeListData取得遊戲類別列表
     */
    const fcGetGameTypeListData = async (): Promise<void> => {
        const res = await apiGetGameTypeList()
        if (res) {
            store.commit('addGameTypeList', res)
        }
    }
    /**
     * fcGetfavoriteGame 取得我的最愛遊戲列表
     */
    const fcGetfavoriteGame = async (): Promise<void> => {
        if (!isLogin.value) return
        const res = await apiGetfavoriteGame()
        if (res.status) {
            store.commit('addFavoriteGameList', res.result)
        }
    }

    interface InterClub {
        gameType: number
    }
    /**
     * fcGetclubList 取得俱樂部列表
     */
    const fcGetclubList = async (): Promise<void> => {
        const res: any = await apiGetClubList();
        const club: InterClub[] = res.filter((item: InterClub) => item.gameType === 3);
        const filterClub: InterClub[] = club.slice(1, 3);
        clubList.value = filterClub;
    }
    fcGetclubList()

    interface InterClubValue {
        id: number
        thirdPartyId: string
    }
    /**
     * fcAddFavoriteGame 新增我的最愛遊戲
     * @param data 遊戲資料
     * @param data.clubId 俱樂部id
     * @param data.id 遊戲id
     * @return void
     */
    const fcAddFavoriteGame = async (data: object): Promise<void> => {

        if (!isLogin.value) {
            ElMessage({
                message: '請先登入',
                grouping: true,
                type: 'warning',
            })
            return
        }
        const clubValue: InterClubValue = clubList.value.find((item: InterClubValue) => item.id === (data as { clubId: number }).clubId);
        const favorite: string[] = favList.value[clubValue.thirdPartyId].includes((data as { id: number }).id) ? favList.value[clubValue.thirdPartyId].filter((item: number) => item !== (data as { id: number }).id) : [...favList.value[clubValue.thirdPartyId], (data as { id: number }).id];
        const param = {
            requestData: JSON.stringify({
                Key: (clubValue as { thirdPartyId: string }).thirdPartyId,
                value: favorite,
            }),
        };
        const res: any = await apiAddFavoriteGame(param);
        if (res.status) {
            localStorage.setItem('favoriteGameList', JSON.stringify({ ...favList.value, [clubValue.thirdPartyId]: favorite }))
            store.commit('addFavoriteGameList', { ...favList.value, [clubValue.thirdPartyId]: favorite })
            await fcGetfavoriteGame()
        }
    }
    /**
   * fcCheckFlag 檢查是否為我的最愛遊戲
   * @param game 遊戲資料
   * @param game.clubId 俱樂部id
   * @param game.id 遊戲id
   * @return boolean
   */

    const fcCheckFlag = ((game: any): boolean => {
        const club: InterClubValue = clubList.value.find((item: InterClubValue) => item.id === game.clubId)
        const favorite: string[] = favList.value[club?.thirdPartyId]
        if (favorite) {
            return favorite.includes(game.id)
        }
        return false
    })

    /**
     * fcIntranceGame 進入遊戲
     * @param game 遊戲資料
     */
    const fcIntranceGame = async (game: any): Promise<void> => {
        if (!isLogin.value) {
            ElMessage({
                message: '請先登入',
                grouping: true,
                type: 'warning',
            })
            return
        }
        const club: InterClubValue = clubList.value.find((item: InterClubValue) => item.id === game.clubId)

        const param = {
            device: isMobile ? 'MOBILE' : 'DESKTOP',
            lang: localStorage.getItem('lang') ?? 'zh-TW',
            lobbyURL: isMobile ? window.location.href : `${window.location.origin}/close`,
            gameCode: game.id
        }
        const specialKey = ['Royal', 'JDB']
        const enterKey: string = specialKey.includes(club.thirdPartyId) ? `W1${club.thirdPartyId}` : club.thirdPartyId
        const result: any = await apiEnter(enterKey, param)
        if (result.status) {
            window.open(result.result.urlInfo)
            loading.value = true
            setTimeout(() => {
                loading.value = false
            }, 3000)
        } else {
            alert('進入遊戲失敗')
        }

    }
    watch(() => isLogin.value, async () => {
        await fcGetfavoriteGame()
    })

    return {
        fcGetGameTypeListData,
        fcAddFavoriteGame,
        fcCheckFlag,
        favList,
        clubList,
        fcIntranceGame,
        loading,
        isLogin
    }
}