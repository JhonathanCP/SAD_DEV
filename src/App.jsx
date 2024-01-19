import React from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { MenuPage } from './pages/MenuPage';
import { InfoComponent } from './components/InfoComponent';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoutes from './components/PrivateRoutes';
import './App.css'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/dashboard/:id" element={<DashboardPage />} />
                    <Route path="/admin/info" element={<InfoComponent />} />
                </Route>
            </Routes>
            <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
    )
}

export default App
