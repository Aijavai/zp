<script setup lang="ts">
import { 
  ref,
  onMounted,  //挂载之后
 } from 'vue'; // 响应式api 将数据包装成响应式对象
// 数据驱动界面
const users = ref([]);
onMounted(() => {
  console.log('页面挂载完成');
  fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
      users.value = data;
    })
});
// setTimeout(() => {
//   users.value.push({ id: 4, name: '赵六', email: 'zhaoliu@example.com' })
// })
</script>

<template>
<table>
  <thead>
    <tr>
      <td>id</td>
      <td>name</td>
      <td>email</td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in users" :key="user.id">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
    </tr>
  </tbody>
</table> 
</template>

<style scoped>

</style>
