<template>
    <el-form ref="ruleFormRef" class="login-form" :model="form" :rules="rules" :inline="true" size="default"
        v-show="!isLogin">
        <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="請輸入客戶名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="請輸入密碼"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">登入</el-button>
        </el-form-item>
    </el-form>
    <div class="isLoginName" v-show="isLogin">
        <el-icon>
            <User />
        </el-icon>
        {{ accountInfo.clubename }}
        <el-button type="primary" @click="fcLogOut()">登出</el-button>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { apiLogin, apiLogout } from '@/service/member/index'
import { isMobile } from '@/utils/mobile'
import { md5 } from 'js-md5';
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const uidKey = ref(isMobile ? 'mobile' : 'web');
const accountInfo = computed(() => store.getters.accountInfo)
const isLogin = computed(() => store.getters.isLogin)

interface Input {
    username: string
    password: string
}
const ruleFormRef = ref<FormInstance>()
const form: Ref<Input> = ref({
    username: 'Datw05',
    password: '8888'
})
const validateUser = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('請輸入用户名'))
    } else {
        callback()
    }
}
const validatePassword = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('請輸入密码'))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<typeof form>>({
    username: [{ required: true, validator: validateUser, message: "請輸入用户名" }],
    password: [{ required: true, validator: validatePassword, message: "請輸入密码" }]
})

const fcCheckLogin = () => {
    const localAccountInfo = localStorage.getItem('accountInfo')
    if (localAccountInfo) {
        const accountInfo = JSON.parse(localAccountInfo)
        store.commit('changeAccountInfo', accountInfo)
    }
}
fcCheckLogin()
const fcLogin = async (): Promise<any> => {
    const param = {
        account: form.value.username,
        password: md5(form.value.password),
        uidKey: uidKey.value
    }
    const result = await apiLogin(param)
    console.log(result)
    if (result.status) {
        store.commit('changeAccountInfo', result.result)
        ElNotification({
            title: '登入成功',
            message: '歡迎回來',
            type: 'success'
        })
    }
}
const fcLogOut = async (): Promise<any> => {
    const result = await apiLogout()
    if (result.status) {
        store.commit('removeAccountInfo')
        store.commit('removeFavoriteGameList')
        ElNotification({
            title: '登出成功',
            message: '歡迎下次再來',
            type: 'info',
        })
    }

}
const submitForm = (form: FormInstance | undefined) => {
    if (!form) return
    form.validate((valid: boolean) => {
        if (valid) {
            fcLogin()
        } else {
            console.log('error submit!!')
            return false
        }
    })
}
</script>

<style lang="scss" scoped >
:deep(.el-form-item__error) {
    padding-left: 7px;
    padding-top: 5px;
}

.el-form-item--default {
    margin-bottom: 0;
}

.isLoginName {
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 10px;
}
</style>