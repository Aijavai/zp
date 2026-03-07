import {
    useParams
} from 'react-router-dom'

export default function UserProfile() {
  const { userId } = useParams()  // 路由参数对象
  console.log(userId, 'userId');
  return (
    <div>
      <h1>UserProfile</h1>
    </div>
  );
}