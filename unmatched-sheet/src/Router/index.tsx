import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Homepage />} />
            </Routes>
        </BrowserRouter>
)
}

export default AppRouter