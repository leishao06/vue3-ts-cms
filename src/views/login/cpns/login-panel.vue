<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- v-model可以取到下面两个el-tab-pane组件的name属性，从而区分是用户名还是手机登录 -->
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><user-filled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <LoginPhone ref="phoneRef"></LoginPhone>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: { UserFilled, Iphone, LoginAccount, LoginPhone },
  setup() {
    // 1. 定义属性
    const isKeepPassword = ref(true)
    // 获取用户名登录组件(login-account)实例，InstanceType<typeof LoginAccount>拿到实例的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    // 获取当前是选择的是用户名登录还是手机登录
    const currentTab = ref('account')

    // 2. 定义方法
    // 登录处理函数
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        // 调用子组件实例中对应处理登录的方法，传入参数表示是否需要记住密码
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phoneRef调用loginAction')
      }
    }

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
