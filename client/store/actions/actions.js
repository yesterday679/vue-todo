//异步代码
export default {
  updateCountAsync(store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  }
}

