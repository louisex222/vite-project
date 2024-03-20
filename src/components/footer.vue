<template>
    <div class="footer">
        <section class="sec_footLink">
            <el-row :gutter="20">
                <el-col :span="6">
                    <li class="title">娛樂場</li>
                    <el-link type="default" v-for="(item, index) in gameType" :key="index">
                        <span>{{ item.code }}</span>
                    </el-link>
                </el-col>
                <el-col :span="6">
                    <li class="title">關於Royal</li>
                    <el-link type="default" v-for="(item, index) in aboutList" :key="index">
                        <span>{{ item.name }}</span>
                    </el-link>
                </el-col>
                <el-col :span="6">
                    <li class="title">用戶指南</li>
                    <el-link type="default" v-for="(item, index) in centerList" :key="index">{{ item.name }}</el-link>
                </el-col>
                <el-col :span="6">
                    <li class="title">關注更多</li>
                    <el-link type="default" v-for="(item, index) in moreList" :key="index">{{ item.name }}</el-link>
                </el-col>
            </el-row>
        </section>
        <section class="sec_copyright">
            <div class="reg_footLogo">
                <li :class="`${item.name}`" v-for="(item, index) in  logoList" :key="index"></li>
            </div>
            <p>Copyright © 2023 Casino Online Entertainment All Rights Reserved</p>
            <p>最佳瀏覽解析 1920x768 建議瀏覽器 IE11以上</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore();
const gameType = computed(() => store.getters.gameTypeList);

interface centerface {
    name: string,
    url: string
}
interface moreface {
    name: string,
    url: string
}
interface aboutface {
    name: string,
    url: string
}
interface logoface {
    name: string,
}

const aboutList = ref<aboutface[]>([
    {
        name: '關於我們',
        url: ''
    },
    {
        name: '賭場介紹',
        url: ''
    }
])
const centerList = ref<centerface[]>([
    {
        name: '下載中心',
        url: ''
    },
    {
        name: '幫助中心',
        url: ''
    },
    {
        name: '會員規章',
        url: ''
    },
    {
        name: '隱私權宣告',
        url: ''
    }
])
const moreList = ref<moreface[]>([
    {
        name: 'Facebook',
        url: ''
    },
    {
        name: 'Instagram',
        url: ''
    },
    {
        name: 'Twitter',
        url: ''
    },
    {
        name: 'Youtube',
        url: ''
    }
])
const logoList = ref<logoface[]>([
    {
        name: 'logo01'
    },
    {
        name: 'logo02'
    },
    {
        name: 'logo03'
    },
    {
        name: 'logo04'
    },
    {
        name: 'logo05'
    },
    {
        name: 'logo06'
    }
])


</script>

<style scoped lang="scss">
@import "@/assets/scss/footer.scss";
</style>