<template>
  <li :class="classNames" @click="handleClick">
    <span>{{tab}}</span>
  </li>
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      index: {
        required: true,
        type: [Number, String]
      },
      label: {
        type: String,
        default: 'tab'
      }
    },
    mounted () {
      this.$parent.panes.push(this)
    },
    computed: {
      active () {
        return this.$parent.value === this.index
      },
      tab () {
        return this.$slots.label || this.label
      },
      classNames () {
        return {
          tab: true,
          active: this.active
        }
      }
    },
    methods: {
      handleClick () {
        this.$parent.onChange(this.index)
      }
    }

  }
</script>

<style lang="stylus" scoped>
  .tab
    list-style none
    line-height 40px
    margin-right 30px
    position relative
    bottom -2px
    cursor pointer
    &.active
      border-bottom 2px solid blue
    &:last-child
      margin-right 0
</style>
