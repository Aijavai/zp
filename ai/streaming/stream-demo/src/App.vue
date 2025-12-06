<script setup lang="ts">
// es6 的解构
// vue 太复杂，目前只需要ref
import { ref } from 'vue';  
// 模板需要消费的数据
// 响应式数据 
// 在数据**改变**的时候，模板（响应）自动更新
let count = ref(111);
console.log(count);
setTimeout(() => {
   count.value = 222;
}, 2000)
</script>

<template>
  <div class="container">
    <div>
      {{count}}
      <label for="">输入：</label>
    </div>
  </div>
</template>

<style scoped>

</style>
