<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
    <HelloWorld v-model:action="action" v-model:params.transage="params" @reset="onReset" />
    <p>action: {{action}}</p>
    <p>params: {{params}}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Data, HomeData } from 'types'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  action = '操作'
  params: Data & HomeData = {}

  mounted () {
    // 异步数据模拟
    setTimeout(() => {
      this.params = {
        name: 'como',
        age: 30,
        msg: 'Welcome to Your Vue.js App based on TypeScript',
        guide: 'For a guide and recipes on how to configure / customize this project,<br>check out the '
      }
    }, 1000)
  }

  onReset () {
    this.action = '操作'
    this.params = {}
  }
}
</script>
