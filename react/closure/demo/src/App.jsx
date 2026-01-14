import {
  useState,
  useEffect
} from 'react'

export default function App() {
  const [count, setCount] = useState(0);
  console.log(count, '--------');
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Current count:', count);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p onClick={() => setCount(count + 1)}>{count}</p>
    </div>
  )
}