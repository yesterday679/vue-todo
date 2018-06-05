<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!--<Todo></Todo>-->
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  // import Todo from './views/todo/todo.vue'
  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'

  export default {
    components: {
      Header,
      Footer,
      // Todo
    },
    mounted() {
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
      ...mapMutations(['updateCount'])
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
