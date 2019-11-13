<template>
  <div id="app">
    <div class="container">
      <ul>
        <li v-for="(name, index) in names" :key="name">
          <a href="#" @click="select(index)" :style="{
            fontWeight: index === activeIndex ? 'bold' : 'normal'
          }">{{ name }}</a>
        </li>
      </ul>

      <div class="main">
        <component :is="state.examples[activeIndex]" />
      </div>
    </div>
  </div>
</template>

<script>
import examples from './examples';
import { reactive, computed, ref } from '@vue/composition-api';

export default {
  name: 'app',
  setup() {
    const state = reactive({ examples })

    const names = computed(() => {
      return state.examples.map(example => example.name)
    })

    const activeIndex = ref(0)

    const select = index => activeIndex.value = index

    return {
      state,
      names,
      select,
      activeIndex
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
}

.main {
  width: 100%;
  padding: 16px;
  margin-left: 40px;
  min-height: 100px;
}

.main > div {
  margin: 0 auto;
}
</style>
