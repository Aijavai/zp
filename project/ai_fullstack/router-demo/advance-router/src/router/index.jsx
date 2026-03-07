import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'

import Home from '../pages/Home'
import Product from '../pages/Product'
import UserProfile from '../pages/UserProfile'
import NotFound from '../pages/NotFound'
import LoadingFallback from '../components/LoadingFallback'

export default function routerConfig() {
    return (
        <BrowserRouter>
            <LoadingFallback />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/user/:userId" element={<UserProfile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}