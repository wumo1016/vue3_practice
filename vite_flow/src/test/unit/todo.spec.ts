import Todo from '@/components/todo/index.vue'

// vitest 测试框架 === jest
// @vue/test-utils 提升测试编写的速度 js -> jq
import { shallowMount, mount } from '@vue/test-utils'

describe('测试todo组件功能是否正常', () => {
  it('用户在输入框中输入内容 会影响数据的变化', () => {
    const wrapper = shallowMount(Todo)
    const input = wrapper.find('input')
    input.setValue('hello')
    expect(wrapper.vm.todo).toBe('hello')
  })
  it('用户点击按钮 新增一条数据 , 但是新增的内容不能为空', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')
    input.setValue('')
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.findAll('li').length).toBe(0)
    input.setValue('hello')
    await button.trigger('click')
    expect(wrapper.findAll('li').length).toBe(1)
  })
  it('用户点击按钮 新增一条数据 , 但是新增的内容不能为空', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')
    const button = wrapper.find('button')
    input.setValue('hello')
    await button.trigger('click')
    expect(wrapper.find('li').text()).toBe('hello')
  })
})
