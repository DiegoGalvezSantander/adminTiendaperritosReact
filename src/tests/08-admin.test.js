import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import AdminReportes from '../pages/admin/AdminReportes';
import AdminProductosCriticos from '../pages/admin/AdminProductosCriticos';
import AdminCategorias from '../pages/admin/AdminCategorias';
import AdminOrdenes from '../pages/admin/AdminOrdenes';
import AdminPerfil from '../pages/admin/AdminPerfil';
import { SesionProvider } from '../context/SesionContext';

function renderConProviders(component) {
    return render(
        <BrowserRouter>
            <SesionProvider>{component}</SesionProvider>
        </BrowserRouter>
    );
}

describe('Renderizado - Dashboard', () => {
    beforeEach(() => localStorage.clear());

    it('muestra el título del dashboard', () => {
        renderConProviders(<Dashboard />);
        expect(screen.getByText(/📊 Dashboard/i)).toBeTruthy();
    });

    it('muestra la tarjeta de Órdenes', () => {
        renderConProviders(<Dashboard />);
        expect(screen.getByText('Órdenes')).toBeTruthy();
    });

    it('muestra la tarjeta de Productos', () => {
        renderConProviders(<Dashboard />);
        expect(screen.getByText('Productos')).toBeTruthy();
    });

    it('muestra la tarjeta de Usuarios', () => {
        renderConProviders(<Dashboard />);
        expect(screen.getByText('Usuarios')).toBeTruthy();
    });

    it('muestra la tarjeta de Ventas totales', () => {
        renderConProviders(<Dashboard />);
        expect(screen.getByText(/Ventas totales/i)).toBeTruthy();
    });

    it('muestra el subtítulo "Resumen de actividades"', () => {
        renderConProviders(<Dashboard />);
        expect(screen.getByText(/Resumen de actividades/i)).toBeTruthy();
    });
});

describe('Renderizado - AdminReportes', () => {
    beforeEach(() => localStorage.clear());

    it('muestra el título de reportes', () => {
        renderConProviders(<AdminReportes />);
        expect(screen.getByText(/📈 Reportes/i)).toBeTruthy();
    });

    it('muestra total de ventas', () => {
        renderConProviders(<AdminReportes />);
        expect(screen.getByText(/Total de ventas/i)).toBeTruthy();
    });

    it('muestra conteo de órdenes', () => {
        renderConProviders(<AdminReportes />);
        expect(screen.getByText(/^Órdenes$/i)).toBeTruthy();
    });

    it('muestra el ticket promedio', () => {
        renderConProviders(<AdminReportes />);
        expect(screen.getByText(/Ticket promedio/i)).toBeTruthy();
    });

    it('muestra el producto más vendido', () => {
        renderConProviders(<AdminReportes />);
        expect(screen.getByText(/Producto más vendido/i)).toBeTruthy();
    });

    it('muestra la categoría más vendida', () => {
        renderConProviders(<AdminReportes />);
        expect(screen.getByText(/Categoría más vendida/i)).toBeTruthy();
    });
});

describe('Renderizado - AdminProductosCriticos', () => {
    beforeEach(() => localStorage.clear());

    it('muestra el título de productos críticos', () => {
        renderConProviders(<AdminProductosCriticos />);
        expect(screen.getAllByText(/Productos con Stock Crítico/i).length).toBeGreaterThan(0);
    });

    it('muestra el subtítulo explicativo', () => {
        renderConProviders(<AdminProductosCriticos />);
        expect(screen.getByText(/necesitan reposición/i)).toBeTruthy();
    });
});

describe('Renderizado - AdminCategorias', () => {
    beforeEach(() => localStorage.clear());

    it('muestra el título de categorías', () => {
        renderConProviders(<AdminCategorias />);
        expect(screen.getByText(/🏷️ Categorías/i)).toBeTruthy();
    });

    it('muestra el formulario para crear categoría', () => {
        renderConProviders(<AdminCategorias />);
        expect(screen.getByText(/Nueva Categoría/i)).toBeTruthy();
    });

    it('muestra el input para nombre de categoría', () => {
        renderConProviders(<AdminCategorias />);
        expect(screen.getByPlaceholderText(/Nombre de la categoría/i)).toBeTruthy();
    });
});

describe('Renderizado - AdminOrdenes', () => {
    beforeEach(() => localStorage.clear());

    it('muestra el título de órdenes', () => {
        renderConProviders(<AdminOrdenes />);
        expect(screen.getByText(/📋 Órdenes/i)).toBeTruthy();
    });

    it('muestra mensaje cuando no hay órdenes', () => {
        renderConProviders(<AdminOrdenes />);
        expect(screen.getByText(/No hay órdenes/i)).toBeTruthy();
    });
});

describe('Renderizado - AdminPerfil', () => {
    beforeEach(() => localStorage.clear());

    it('muestra el título de perfil', () => {
        renderConProviders(<AdminPerfil />);
        expect(screen.getByText(/⚙️ Perfil/i)).toBeTruthy();
    });
});