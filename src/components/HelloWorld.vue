<template>
  <div class="hello">
    <h1>{{params.msg || '--'}}</h1>
    <p>源数据：{{msg}}</p>
    <p>action: <input :value="action" @input="$emit('update:action', $event.target.value)" /></p>
    <p>name: <input v-model="params.name" /> age: <input v-model="params.age" /></p>
    <p>
      <span v-html="params.guide"></span>
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <p><button @click="onReset('test1', 'test2')">重置</button></p>
  </div>
</template>

<script lang="ts">
import { Options, Vue, createDecorator } from 'vue-class-component'
import { ConstructorType, Data, HomeData } from 'types'

// 自定义类装饰器-原生方法
const NativeClassDecorator = <T extends ConstructorType>(constructor: T) => {
  return class extends constructor {
    msg: string | number | null = null
    mounted () {
      console.log('NativeClassDecorator')
      this.msg = '我是重载后的msg'
    }
  }
}
// 自定义方法装饰器-原生方法
const NativeMethodDecorator = (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
  console.log('NativeMethodDecorator, target:', target)
  console.log('NativeMethodDecorator, propertyKey:', propertyKey)
  console.log('NativeMethodDecorator, descriptor:', descriptor)
  const method = descriptor.value
  descriptor.value = function (arg1: string, arg2?: string) {
    console.log('arg1:', arg1)
    if (arg2) console.log('arg2', arg2)
    method.apply(this, [arg1, arg2])
  }
}
// 自定义类装饰器
const ClassDecorator = createDecorator((options) => {
  console.log('ClassDecorator, options:', options)
})
// 自定义方法装饰器
const MethodDecorator = createDecorator((options, key) => {
  console.log('MethodDecorator, options:', options)
  console.log('MethodDecorator, key:', key)
  const originalMethod = options.methods[key]
  options.methods[key] = function wrapperMethod <T> (...args: T[]): void {
    console.log(`Invoked: ${key}(`, ...args, ')')
    originalMethod.apply(this, args)
  }
})

@ClassDecorator
@NativeClassDecorator
@Options({
  props: {
    action: String,
    params: Object,
    paramsModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:action', 'reset'],
  watch: {
    'params.age': {
      handler (n: string) {
        if (this.paramsModifiers.transage && n) {
          this.params.age = parseInt(n)
        }
      }
    }
  }
})
export default class HelloWorld extends Vue {
  params!: Data & HomeData
  msg: string | number | null = null

  mounted () {
    this.msg = 'mounted'
  }

  @MethodDecorator
  @NativeMethodDecorator
  onReset (arg: string) {
    console.log('arg:', arg)
    this.msg = 'reset'
    this.$emit('reset')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
