import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message111'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    console.log('1324343', wrapper.text())
    expect(wrapper.text()).toMatch('new message')
  })
})
