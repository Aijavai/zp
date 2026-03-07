import {
    useEffect
} from 'react'

import {
    useNavigate
} from 'react-router-dom'

export default function NotFound() {
    let navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, [])
    return (
        <div>
            <h1>404 Not Found</h1>
        </div>
    )
}
