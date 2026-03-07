import { 
  lazy,
  Suspense,
} from 'react'
import {
  BrowserRouter as Router,
  HashRouter,   // hash 
  Link,
  Routes,
  Route,
} from 'react-router-dom'
// import Home from './pages/Home'
import routerConfig from './router'
export default function App() {
  return (
    <>
     <routerConfig />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/products" element={<Products />}>
            <Route path=":productId" element={<ProductDetail />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
        </Routes>
      </Suspense>
      </Router>
    </>
  );
}