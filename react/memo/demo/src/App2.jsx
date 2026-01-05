import { 
  useState,
  useMemo // 性能优化
} from 'react';

// 耗性能的计算
function slowSum(n) {
  console.log('计算中...');
  let sum = 0;
  for (let i = 0; i < n * 100000; i++) {
    sum += i;
  }
  return sum;
}
function App() {
  // count 和 keyword 没关系
  // 状态的改变，组件函数的重新运行
  // useEffect、useMemo、useCallback 标记一下不用运行
 const [count, setCount] = useState(0);
 const [keyword, setKeyword] = useState('');
 const list = ['apple', 'banana', 'orange', 'pear'];
//  const filterList = list.filter(item => {
//   console.log('filter 执行');
//   return item.includes(keyword);
//  })
 const filterList = useMemo(() => {
// computed 
 console.log('filter 执行');
 return list.filter(item => item.includes(keyword));
 }, [keyword]);

 const [num, setNum] = useState(0);
 const result = useMemo(() => {
  return slowSum(num)
 }, [num]);
 
 return (
    <div>
      <p>结果： {result} </p>
      <button onClick={() => setNum(num + 1)}>num + 1</button>

      <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}/>
      {count}
      <button onClick={() => setCount(count + 1)}>count + 1</button>
      {
        filterList.map(item => (
          <li>{item}</li>
        ))
      }
    </div>
 )
}

export default App
