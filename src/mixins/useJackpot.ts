import { getJackpotApi } from '@/service/other/jackpot'
import { fcGetTime } from '@/utils/time'
import { getFloorNumber, getRandomNumber, randomString } from '@/utils/number';
import { rcgandroyalHotGameListApi, getSlotGameListApi } from '@/service/game/detail'
interface potList {
    userId: string,
    gameName: string,
    money: number
}
export default function useJackpot() {
    const jackpot: Ref<number> = ref(0)
    const jacktoolNumber: Ref<number> = ref(0)
    const jackpotList: Ref<potList[]> = ref([])
    const fcGetJackpotList = async () => {
        const slotGameList = await getSlotGameListApi('Royal')
        const rcgandroyalHot = await rcgandroyalHotGameListApi()
        const royalHot = rcgandroyalHot.find((item: any) => item.id === 'Royal').itemList
        const game = royalHot.map((item: any) => {
            const value = slotGameList.find((royal: any) => royal.id === item)
            return value
        })
        for (let i = 0; i < 10; i++) {
            jackpotList.value.push({
                userId: randomString(7),
                gameName: game[i].name,
                money: getRandomNumber(100, 1000)
            })
        }
        return jackpotList.value
    }
    fcGetJackpotList()
    const fcGetJackpot = async () => {
        const startTime = fcGetTime()
        const endTime = fcGetTime(1)
        const param = {
            currency: 'THB',
            startTime,
            endTime
        }
        const result: any = await getJackpotApi(param)
        if (result.status === 1) {
            const type: number = 0
            const jacktool = result.result.jackpotPoolValue.data.find((item: any) => item.jackpotType === type.toString())
            jacktoolNumber.value = Number(jacktool.jackpotPoolAmt)
            const moneyDown: number = jacktoolNumber.value > 0 ? 100 : 0;
            jackpot.value = jacktoolNumber.value - moneyDown
        }
    }


    const jackpotTimer = ref<any>()
    const fcGetJackpotInterval = () => {
        const calc = async () => {
            if (jackpot.value > jacktoolNumber.value) return
            await fcGetJackpot()
        }
        calc()
        jackpotTimer.value = window.setInterval(() => {
            calc()
        }, 5000)
    }
    fcGetJackpotInterval()

    const watchJacktopTimer: Ref<any> = ref(null)
    watch(() => jackpot.value, (val: number) => {
        window.clearInterval(watchJacktopTimer.value)
        const range: number = jacktoolNumber.value - val
        const speed: number = 50 / 1000
        const change: number = getFloorNumber((range / 10) * speed, 2)
        watchJacktopTimer.value = window.setInterval(() => {
            getFloorNumber(val) < getFloorNumber(jacktoolNumber.value) ? jackpot.value += change : jackpot.value -= change
        }, 50)
    })

    onUnmounted(() => {
        window.clearInterval(jackpotTimer.value)
        window.clearInterval(watchJacktopTimer.value)
    })
    return {
        jackpot,
        jackpotList,
    }
}
