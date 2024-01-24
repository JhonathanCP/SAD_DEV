import React from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { MenuPage } from './pages/MenuPage';
import { InfoComponent } from './components/InfoComponent';
import { UsersList } from './components/UsersList';
import { EditGroupComponent } from './components/EditGroupComponent';
import { EditReportComponent } from './components/EditReportComponent';
import { UserPermissionComponent } from './components/UserPermissionComponent';
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
                <Route path="/admin" element={<Navigate to="/admin/info" />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/dashboard/:id" element={<DashboardPage />} />
                    <Route path="/admin/info" element={<InfoComponent />} />
                    <Route path="/admin/users" element={<UsersList />} />
                    <Route path="/admin/user/:id" element={<UserPermissionComponent />} />
                    <Route path="/admin/editar/grupo/" element={<EditGroupComponent />} />
                    <Route path="/admin/editar/grupo/:id" element={<EditGroupComponent />} />
                    <Route path="/admin/editar/reporte/" element={<EditReportComponent />} />
                    <Route path="/admin/editar/reporte/:id" element={<EditReportComponent />} />
                </Route>
            </Routes>
            <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
    )
}

export default App
