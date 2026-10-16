import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ rol }) {
    const { pathname } = useLocation();
    const items = [
        { to: '/admin', label: '📊 Dashboard', roles: ['Administrador', 'Vendedor'] },
        { to: '/admin/productos', label: '📦 Productos', roles: ['Administrador', 'Vendedor'] },
        { to: '/admin/productos-criticos', label: '⚠️ Stock Crítico', roles: ['Administrador', 'Vendedor'] },
        { to: '/admin/categorias', label: '🏷️ Categorías', roles: ['Administrador'] },
        { to: '/admin/usuarios', label: '👤 Usuarios', roles: ['Administrador'] },
        { to: '/admin/ordenes', label: '📋 Órdenes', roles: ['Administrador', 'Vendedor'] },
        { to: '/admin/historial', label: '📜 Historial', roles: ['Administrador'] },
        { to: '/admin/reportes', label: '📈 Reportes', roles: ['Administrador'] },
        { to: '/admin/perfil', label: '⚙️ Perfil', roles: ['Administrador', 'Vendedor'] }
    ];
    return (
        <aside className="admin-sidebar">
            <h3>Menú</h3>
            {items.filter(i => i.roles.includes(rol)).map(i => (
                <Link key={i.to} to={i.to} className={pathname === i.to ? 'menu-admin activo' : 'menu-admin'}>
                    {i.label}
                </Link>
            ))}
        </aside>
    );
}