<script setup>
  // 业务是页面上要动态展示标题，且可以编辑标题
  // vue focus 标题数据业务，修改数据，余下的dom 更新vue 替我们做了
  // setup vue3 composition 组合式API
  // vue2 option 选项式API
  import { ref, onMounted, computed } from 'vue';
  
  // 响应式数据
  const title = ref("todos");
  const newTodoText = ref("");
  const todos = ref([
    { id: 1, context: '打王者', done: false },
    { id: 2, context: '吃饭', done: true }, // 这里设为 true 以测试绿色对勾
    { id: 3, context: '睡觉', done: false },
    { id: 4, context: '学习Vue', done: false }
  ])

  let nextId = 5;

  // 依赖于todos 响应式数据的 计算属性
  // 形式上是函数（计算过程），结果（计算属性）返回
  // 也是响应式的, 依赖于todos
  // computed 缓存 性能优化 只有 todos 变化时才会重新计算
  const active = computed(() => {
    return todos.value.filter(todo => !todo.done).length
  })

  // 计算已完成的数量，用于控制 "Clear completed" 按钮的显示
  const completedCount = computed(() => {
    return todos.value.filter(todo => todo.done).length
  })

  const addTodo = () => {
    const text = newTodoText.value.trim();
    if (!text) return;
    todos.value.push({
      id: nextId++,
      context: text,
      done: false
    });
    newTodoText.value = "";
  }

  // computed 高级技巧
  // get set 属性的概念
  const allDone = computed({
    get() {
      return todos.value.length > 0 && todos.value.every(todo => todo.done)
    },
    set(val) {
      todos.value.forEach(todo => todo.done =val)
    }
  })

  // 删除
  const removeTodo = (id) => {
    todos.value = todos.value.filter(item => item.id !== id)
  }

  // ✅ 新增：清除已完成功能（还原目标图右下角按钮）
  const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.done)
  }
</script>

<template>
  <div class="todoapp">
    
    <header class="header">
      <h1>{{ title }}</h1>
      <input 
        class="new-todo" 
        type="text" 
        v-model="newTodoText" 
        @keydown.enter="addTodo" 
        placeholder="What needs to be done?"
        autofocus
      >
    </header>

    <section class="main" v-if="todos.length">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
      <label for="toggle-all">Mark all as complete</label>

      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.done }">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.done">
            <label>{{ todo.context }}</label>
            <button class="destroy" @click="removeTodo(todo.id)"></button>
          </div>
        </li>
      </ul>
    </section>

    <footer class="footer" v-if="todos.length">
      <span class="todo-count">
        <strong>{{ active }}</strong> items left
      </span>
      
      <button class="clear-completed" @click="clearCompleted" v-show="completedCount > 0">
        Clear completed
      </button>
    </footer>

  </div>
</template>

<style>

:focus { outline: 0; }

body {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  font-weight: 300;
}

.todoapp {
  background: #fff;
  /* 修复：增加顶部外边距 (130px -> 160px)，确保 h1 不会被遮挡 */
  margin: 160px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
              0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp h1 {
  position: absolute;
  /* 标题向上偏移，由于 .todoapp margin 增大了，这里可以保持原样或微调 */
  top: -155px; 
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

/* --- 修复：全选箭头 (Chevron) --- */
.toggle-all {
  width: 1px;
  height: 1px;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px; /* 把它向上拉，进入 header 区域 */
  left: -13px;
  transform: rotate(90deg);
  cursor: pointer;
}

.toggle-all + label:before {
  content: '❯';
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

/* --- 列表样式 --- */
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li .editing .view {
  display: none;
}

.todo-list li .view {
  display: flex; /* 确保垂直居中 */
  align-items: center;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;
}

/* 未选中状态：灰色圆圈 SVG */
.todo-list li .toggle + label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center left;
  background-size: 36px; /* 调整图标大小 */
}

/* 选中状态：绿色对勾 SVG */
.todo-list li .toggle:checked + label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  flex: 1;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background: none;
  border: none;
  cursor: pointer;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: '×';
}

.todo-list li:hover .destroy {
  display: block;
}

/* --- Footer 和 Clear Completed 按钮 --- */
.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
              0 8px 0 -3px #f6f6f6,
              0 9px 1px -3px rgba(0, 0, 0, 0.2),
              0 16px 0 -6px #f6f6f6,
              0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count strong {
  font-weight: 300;
}

/* 清除完成按钮样式 */
.clear-completed,
.clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  background: none;
  font-size: 100%; /* 继承父级字体大小 */
  color: inherit;   /* 继承父级颜色 #777 */
  margin: 0;
  padding: 0;
}

.clear-completed:hover {
  text-decoration: underline;
}
</style>