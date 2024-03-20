<template>
    <section class="wrapper" v-loading.fullscreen.lock="loading">
        <div class="reg_slot">
            <div class="are_slot">
                <div class="slotJackpot_title">
                    {{ numeralFormat(jackpot, '0,0.00') }}
                </div>
                <div class="slotJackpot_list">
                    <ul>
                        <li v-for="(item, index) in jackpotList" :key="index">
                            <div class="user">
                                {{ item.userId }} in
                                <span>
                                    {{ item.gameName }}
                                </span>
                            </div>
                            <div class="money">
                                ฿{{ numeralFormat(item.money, '0,0.00') }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content">
            <aside class="aside">
                <ul class="aside_list">
                    <li @click="fcChangClub(1)" :class="{ active: clubValue === 1 }" v-show="isLogin">
                        <i class="i i-fav" :class="{ active: clubValue === 1 }"></i>
                        <span>收藏</span>
                    </li>
                    <li :class="{ active: clubValue === item.id }" v-for="(item, index) in clubList" :key="item.code"
                        @click="fcChangClub(item.id)">
                        <i class="i" :class="[
                            `i-${item.thirdPartyId}`,
                            { active: clubValue === item.id }
                        ]"></i>
                        <span>{{ item.thirdPartyId }}</span>
                    </li>
                </ul>
            </aside>
            <div class="main">
                <header class="main_header">
                    <div class="tabs">
                        <div class="tab" :class="{ active: categoryValue === item.id }"
                            v-for="(item, index) in  categoryList " :key="index" @click="fcChangCategoryValue(item.id)">
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="searchBar">
                        <div class="ui_iptSearch">
                            <input type="text" class="ipt_search" placeholder="搜尋" v-model.trim="searchValue" />
                        </div>
                    </div>
                </header>
                <div class="panel_wrap">
                    <div class="panel_gamelist" v-for="( item ) in  filterSlotGameList  " :key="item.id">
                        <div class="panel_img" @click="fcIntranceGame(item)">
                            <span class="txt_maintain" />
                            <img v-lazy="fcGetImage(item.imagePath, item.id)">
                            <span class="btnTag"></span>
                        </div>
                        <div>
                            <div class="panel_name">
                                {{ fcChangelocalizationCode(item) }}
                                <i class="i i-fav" :class="{ active: fcCheckFlag(item) }"
                                    @click="fcAddFavoriteGame(item)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import useJackpot from '@/mixins/useJackpot'
import { numeralFormat } from '@/utils/number';
import { apiGetCategoryList } from '@/service/type/config'
import { getSlotRoyalGameList, getSlotJDBGameList } from '@/utils/localstorage'
import useHome from '@/mixins/useHome'
import { InterCategory, InterCreateImage, InterSlotGame, InterMixList, InterList } from '@/vite/homeInter'
import { useI18n } from 'vue-i18n'
const { t, te } = useI18n()
const { jackpot, jackpotList } = useJackpot()
const { fcAddFavoriteGame, fcCheckFlag, favList, clubList, fcIntranceGame, loading, isLogin } = useHome()
const clubDefault: Ref<number> = ref(0)
const clubValue: WritableComputedRef<number> = computed({
    get() {
        const data = clubList.value[0]?.id || 0
        return clubDefault.value === 0 ? data : clubDefault.value
    },
    set(value: number) {
        clubDefault.value = value
    }
})
const categoryValue: Ref<number> = ref(1)
const categoryList: Ref<any[]> = ref([])
const slotGameList: Ref<any[]> = ref([])
const searchValue: Ref<string> = ref('')

const fcGetSlotGameList = async (): Promise<void> => {
    const [royal, jdb]: any[] = await Promise.all([getSlotRoyalGameList(), getSlotJDBGameList()])
    const res = [...royal, ...jdb]
    slotGameList.value = res
}
fcGetSlotGameList()


const fcChangClub = (id: number): void => {
    clubDefault.value = id
}

const fcGetCategoryList = async (): Promise<void> => {
    const res: any = await apiGetCategoryList()
    const includeList: number[] = [1]
    const filterList: InterCategory[] = res.filter((item: InterCategory) => includeList.includes(item.id))
    categoryList.value = filterList
}
fcGetCategoryList()

const fcChangCategoryValue = (id: number): void => {
    categoryValue.value = id
}

const fcGetImage = <T extends InterCreateImage>(imagePath: T, id: T) => {
    return new URL(`../assets/img/${imagePath}/${id}.jpg`, import.meta.url).href
}
const fcChangelocalizationCode = (game: any): void => {
    const { localizationCode } = game
    return te(localizationCode) ? t(localizationCode) : game.name
}
const filterSlotGameList: WritableComputedRef<any[]> = computed({
    get() {
        const list: InterSlotGame[] = clubValue.value === 1 ? fcFavList() : fcMixclubandCategory(clubValue.value, categoryValue.value)
        if (searchValue.value) {
            return list.filter((item: InterSlotGame) => item.name.includes(searchValue.value))
        }
        return list
    },
    set(value: any[]) {
        slotGameList.value = value
    }
})

const fcMixclubandCategory = (club: number, category: number): any[] => {
    const list: InterMixList[] = slotGameList.value
        .filter((item: InterMixList) => item.clubId === club && item.categoryIdList.includes(category))
        .sort((a, b) => a.sort - b.sort)
        .filter((item) => item.categoryIdList.includes(3) === false)
    return list
}

const fcFavList = () => {
    const list: InterList[] = slotGameList.value.filter((item: InterList) => {
        const club = clubList.value.find((club) => club.id === item.clubId)
        const filterFav = favList.value[club.thirdPartyId].includes(item.id)
        return filterFav
    })

    return list
}
watch(() => isLogin.value, () => {
    const data = clubList.value[0]?.id || 0
    fcChangClub(data)
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/home.scss";
</style>