import { Route, Routes } from 'react-router-dom';

import GoogleKeep from './pages/GoogleKeep';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<GoogleKeep />} />
            </Routes>
        </>
    );
};

export default App;
