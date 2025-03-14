import React from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path='/player/:id' element={<PrivateRoute><Player /></PrivateRoute>} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
