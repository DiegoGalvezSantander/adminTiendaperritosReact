import React from 'react';
import { obtenerProductos, obtenerUsuarios, obtenerOrdenes } from '../../utils/productos';

export default function Dashboard() {
    const productos = obtenerProductos();
    const usuarios = obtenerUsuarios();
    const ordenes = obtenerOrdenes();
    const totalVentas = ordenes.reduce((s, o) => s + o.total, 0);

    return (
        <div>
            <h2>📊 Dashboard</h2>
            <p className="text-muted">Resumen de actividades</p>
            <div className="row g-3 mt-3">
                <div className="col-md-3">
                    <div className="text-white p-4 rounded-3" style={{ background: '#2563eb' }}>
                        <h5>Órdenes</h5>
                        <p className="display-5 mb-0">{ordenes.length}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="text-white p-4 rounded-3" style={{ background: '#16a34a' }}>
                        <h5>Productos</h5>
                        <p className="display-5 mb-0">{productos.length}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="text-white p-4 rounded-3" style={{ background: '#f59e0b' }}>
                        <h5>Usuarios</h5>
                        <p className="display-5 mb-0">{usuarios.length}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="text-white p-4 rounded-3" style={{ background: '#8b5cf6' }}>
                        <h5>Ventas totales</h5>
                        <p className="display-6 mb-0">${totalVentas.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}