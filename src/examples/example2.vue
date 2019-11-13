<template>
  <div>
    <div>x: {{ x }}</div>
    <div>y: {{ y }}</div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from '@vue/composition-api';

function useMouseTracking() {
    const x = ref(0)
    const y = ref(0)

    const changePos = e => {
      x.value = e.clientX
      y.value = e.clientY
    }

    onMounted(() => {
      window.addEventListener('mousemove', changePos)
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', changePos)
    })

    return {
      x,
      y
    }
}

export default {
  name: 'MouseTracking',
  setup() {
    const { x, y } = useMouseTracking()

    return {
      x,
      y
    }
  }
}
</script>

<style>

</style>
