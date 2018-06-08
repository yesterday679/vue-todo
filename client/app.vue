<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!--<router-link to="/app">app</router-link>-->
    <!--<router-link to="/login">login</router-link>-->
    <!--<button @click="notify">click me1</button>-->
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'

  export default {
    metaInfo: {
      title: 'Ross\'s Todo App'
    },
    components: {
      Header,
      Footer
    },
    mounted () {
      // this.$store.dispatch('updateCountAsync', {  //actions
      //   num: 5,
      //   time: 2000
      // })

      // let i = 1
      // setInterval(() => {
      //   this.$store.commit('updateCount', i++) //mutations
      // })
    },
    methods: {
      ...mapActions(['updateCountAsync']),
      ...mapMutations(['updateCount']),
      notify () {
        this.$notify({
          content: '消息通知',
          btn: '关闭'
        })
      }
    },
    computed: {
      ...mapState({
        counter: (state) => state.count
      }),
      ...mapGetters(['fullName'])
    }
  }
</script>

<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0

  #cover
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1

</style>
