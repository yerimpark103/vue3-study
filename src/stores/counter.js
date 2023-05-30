import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 1,
  }),
  getters: {
    doubleCount: state => state.counter * 2,
    doubleCountPlusOne() {
      return this.doubleCount + 1;
    },
  },
  actions: {
    // 화살표 함수가 아닌 이유 : this 에 접근해야 하기 때문.
    increment() {
      this.counter++;
    },
  },
});
