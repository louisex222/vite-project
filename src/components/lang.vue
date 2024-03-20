<template>
    <el-select v-model="value" class="m-2" placeholder="Select" size="default">
        <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"
            @click="fcChangeLang(item.value)" />
    </el-select>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const value = computed({
    get: () => locale.value,
    set: (lang: string) => {
        locale.value = lang
    },

})
interface Option {
    value: string
    label: string
}
const options: Array<Option> = [
    {
        value: 'zh-TW',
        label: 'zh-TW',
    },
    {
        value: 'en-US',
        label: 'en-US',
    },
]

const fcChangeLang = (lang: string): void => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}
</script>

<style scoped></style>