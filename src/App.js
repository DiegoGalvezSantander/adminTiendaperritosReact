import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SesionProvider } from './context/SesionContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProductos from './pages/admin/AdminProductos';
import AdminProductosCriticos from './pages/admin/AdminProductosCriticos';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminBoleta from './pages/admin/AdminBoleta';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminHistorial from './pages/admin/AdminHistorial';
import AdminReportes from './pages/admin/AdminReportes';
import AdminPerfil from './pages/admin/AdminPerfil';

export default function App() {
    return (
        <BrowserRouter>
            <SesionProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="productos" element={<AdminProductos />} />
                        <Route path="productos-criticos" element={<AdminProductosCriticos />} />
                        <Route path="usuarios" element={<AdminUsuarios />} />
                        <Route path="ordenes" element={<AdminOrdenes />} />
                        <Route path="boleta/:id" element={<AdminBoleta />} />
                        <Route path="categorias" element={<AdminCategorias />} />
                        <Route path="historial" element={<AdminHistorial />} />
                        <Route path="reportes" element={<AdminReportes />} />
                        <Route path="perfil" element={<AdminPerfil />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
                <Footer />
            </SesionProvider>
        </BrowserRouter>
    );
}