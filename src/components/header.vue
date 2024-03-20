<template>
    <div class="header">
        <div class="sec_header">
            <div class="reg_head">
                <router-link class="lnk_logo" to="/"></router-link>
                <login />
                <lang />
            </div>
            <div class="hr_gold large" />
            <div class="nav">
                <template v-for="(item, index) in gameType" :key="index">
                    <li class="li_nav">
                        <a class="lnk_nav" href="javascript:;" :class="`i_${item.code.toLowerCase()}`">
                            <span class="txt_nav">{{ $t(item.localizationCode) }}</span>
                        </a>
                    </li>
                </template>
            </div>
            <div class="hr_gold" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import login from '@/components/login.vue'
import lang from '@/components/lang.vue'
import { useStore } from 'vuex';
const store = useStore();
const gameType = computed(() => store.getters.gameTypeList);

</script>

<style scoped lang="scss">
@import "@/assets/scss/header.scss";
</style>